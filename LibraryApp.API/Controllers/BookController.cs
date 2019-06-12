using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using LibraryApp.API.Data;
using LibraryApp.API.Dtos;
using LibraryApp.API.Helper;
using LibraryApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;



namespace LibraryApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookShowRepository _repo;
        private readonly IMapper _mapper;
        private readonly IAuthorShowRepository _author_Repo;

        public BookController(IBookShowRepository repo, IMapper mapper, IAuthorShowRepository author_repo)
        {
            _repo = repo;
            _mapper = mapper;
            _author_Repo = author_repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks([FromQuery]BookParams bookParams)
        {
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            bookParams.UserId = currentUser;

            if(string.IsNullOrEmpty(bookParams.MainGenre))
            {
                bookParams.MainGenre = "ALL";
            }
            if(string.IsNullOrEmpty(bookParams.BookName))
            {
                bookParams.BookName = "ALL";
            }

            var books = await _repo.GetBooks(bookParams);
            var booksToReturn = _mapper.Map<IEnumerable<BooksForListDto>>(books);

            Response.AddPagination(books.CurrentPage, books.PageSize, books.TotalCount, books.TotalPages);
            return Ok(booksToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _repo.GetBook(id);
            var bookToReturn =_mapper.Map<BooksForListDto>(book);
            return Ok(bookToReturn);
        }

        [HttpGet("author")]
        public async Task<IActionResult> GetAuthors([FromQuery]AuthorParams authorParams)
        {

            if(string.IsNullOrEmpty(authorParams.AuthorName))
            {
                authorParams.AuthorName = "ALL";
            }

            var authors = await _author_Repo.GetAuthors(authorParams);
            var authorsToReturn = _mapper.Map<IEnumerable<AuthorsForListDto>>(authors);

            Response.AddPagination(authors.CurrentPage, authors.PageSize, authors.TotalCount, authors.TotalPages);
            return Ok(authorsToReturn);
        }

        [HttpGet("author/{id}")]
        public async Task<IActionResult> GetAuthor(int id)
        {
            var author = await _author_Repo.GetAuthor(id);
            var authorToReturn =_mapper.Map<AuthorsForListDto>(author);
            return Ok(authorToReturn);
        }

        [HttpGet("authorbooklist/{id}")]
        public  IEnumerable<Authorbooklist> GetAuthorBookList(int id)
        {
            List<Authorbooklist> bookinfo = new List<Authorbooklist>();
            
            using (SqlConnection conn = new SqlConnection(@"Data Source=SE140003;Initial Catalog=LibraryApp5;Integrated Security=True"))
            {
                
                SqlCommand cmd = new SqlCommand("GetBookByAuthorId", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@AuthorId",id);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    Authorbooklist info = new Authorbooklist();
                    info.Id = reader["Id"].ToString();
                    info.Isbn = reader["Isbn"].ToString();
                    info.BookName = reader["BookName"].ToString();
                    info.MainGenre = reader["MainGenre"].ToString() ;
                    info.SubGenre = reader["SubGenre"].ToString();
                    info.PublishedDate = reader["PublishedDate"].ToString();
                    bookinfo.Add(info);
                }

            }

            return bookinfo;
        }

        [HttpPost("{id}/borrow/{bookId}")]
        public async Task<IActionResult> BorrowBook(int id, int bookId)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var borrow = await _repo.GetBorrow(id, bookId);
            var count = await _repo.CountBorrow(id);

            if(borrow != null)
                return BadRequest("You already bookmarked this book");

            

            borrow =  new Borrow
            {
                BorrowerId = id,
                BookId = bookId,
                LoanDate  = DateTime.Now,
                ReturnDate = DateTime.MinValue
            };
            _repo.Add<Borrow>(borrow);

            if(await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to borrow this book");

        }

        [HttpPut("{id}/return/{bookId}")]
        public async Task<IActionResult> ReturnBook(int id, int bookId)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var borrow = await _repo.GetBorrow(id, bookId);
            
            borrow.ReturnDate = DateTime.Now;
            if(await _repo.SaveAll())
                return Ok();
            
            return BadRequest("Failed to return this book");

        }

        [HttpPut("extend/{loanId}")]
        public void  ExtendLoanPeriod(int loanId)
        {
            using (SqlConnection conn = new SqlConnection(@"Data Source=SE140003;Initial Catalog=LibraryApp5;Integrated Security=True"))
            {
                
                SqlCommand cmd = new SqlCommand("ExtendLoanPeriod", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@LoanId",loanId);
                conn.Open();
                try
                {
                    cmd.ExecuteNonQuery();
                    
                }
                catch (System.Exception)
                {
                    throw new System.ArgumentException("Failed to extend loan period", "original");
                    
                }

            }
            
            

        }

        [HttpGet("{id}/content/{bookId}")]
        public async Task<IActionResult> GetBookContent(int id, int bookId)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var borrow = await _repo.GetBorrow(id, bookId);

            if((DateTime.Now - borrow.LoanDate).TotalDays > 14)
            {
                return BadRequest("Request refused, your loan time is ended");
            }

            if(borrow.ReturnDate != DateTime.MinValue)
            {
                return BadRequest("You have returned this book");
            }
            var book = await _repo.GetBook(bookId);

            string bookName = book.BookName;

            string filedirection = @"D:\BookContent\%bookname%".Replace("%bookname%", bookName);

            if(!Directory.Exists(filedirection))
            {
                return BadRequest("Failed to load book content");
            }

            string[] files = Directory.GetFiles(filedirection, "Page*.txt");

            List<string> bookContent = new List<string>();

            foreach (string file in files)
            {
                string [] fileContent = System.IO.File.ReadAllLines(file);
                bookContent.AddRange(fileContent);    
            }
            bookContent.Reverse();

            return Ok(bookContent);        
        }


        [HttpGet("{id}/getloaninfo/{bookId}")]
        public  IEnumerable<BookLoanInfo> GetBookLoanInfo(int id, int bookId)
        {
                 
            List<BookLoanInfo> loaninfo = new List<BookLoanInfo>();
            
            using (SqlConnection conn = new SqlConnection(@"Data Source=SE140003;Initial Catalog=LibraryApp5;Integrated Security=True"))
            {
                
                SqlCommand cmd = new SqlCommand("ViewBookLoanInfo", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@BookId",bookId);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    BookLoanInfo info = new BookLoanInfo();
                    info.BookName = reader["BookName"].ToString();
                    info.BookSubId = Convert.ToInt32(reader["BookSubId"].ToString());
                    if((bool)reader["LoanStatus"] == false)
                    {
                            info.LoanStatus = "Free to loan";
                    }
                    else info.LoanStatus = "Loaning";
                    info.BookStatus = reader["BookStatus"].ToString() ;
                    info.LoanDocRef = reader["LoanDocRef"].ToString();
                    info.LoanDate = reader["LoanDate"].ToString();
                    info.ExpectReturnDate = reader["ExpectReturnDate"].ToString();
                    loaninfo.Add(info);
                }

            }

            return loaninfo;
                
        }

        [HttpGet("{id}/getuserloaninfo/{bookId}")]
        public  IEnumerable<UserLoanInfo> GetUserLoanInfo(int id, int bookId)
        {
                 
            List<UserLoanInfo> userloaninfo = new List<UserLoanInfo>();
            
            using (SqlConnection conn = new SqlConnection(@"Data Source=SE140003;Initial Catalog=LibraryApp5;Integrated Security=True"))
            {
                
                SqlCommand cmd = new SqlCommand("UserLoanView", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId",id);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    UserLoanInfo info = new UserLoanInfo();
                    info.LoanId = Convert.ToInt32(reader["LoanId"].ToString());
                    info.BookId = Convert.ToInt32(reader["BookId"].ToString());
                    info.BookSubId = reader["BookSubId"].ToString();                    
                    info.BookName = reader["BookName"].ToString();
                    info.BookStatus = reader["BookStatus"].ToString() ;
                    if((bool)reader["LoanStatus"] == false)
                    {
                            info.LoanStatus = "Returned";
                    }
                    else info.LoanStatus = "Loaning";    
                    info.FineMoney = reader["FineMoney"].ToString();
                    info.LoanDate = reader["LoanDate"].ToString(); 
                    info.ExpectReturnDate = reader["ExpectReturnDate"].ToString();
                    info.ActualReturnDate = reader["ActualReturnDate"].ToString();            
                    info.LoanDocNo = reader["LoanDocNo"].ToString();
                    info.ReturnDocNo = reader["ReturnDocNo"].ToString();
                    userloaninfo.Add(info);
                    
                    
                }

            }
             
            return userloaninfo;
                
        }
    }
}