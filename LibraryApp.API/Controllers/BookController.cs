using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using LibraryApp.API.Data;
using LibraryApp.API.Dtos;
using LibraryApp.API.Helper;
using LibraryApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookShowRepository _repo;
        private readonly IMapper _mapper;

        public BookController(IBookShowRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
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

        [HttpPost("{id}/borrow/{bookId}")]
        public async Task<IActionResult> BorrowBook(int id, int bookId)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var borrow = await _repo.GetBorrow(id, bookId);
            var count = await _repo.CountBorrow(id);

            if(borrow != null)
                return BadRequest("You already borrowed this book");

            if(count > 3)
                return BadRequest("You can only loan up to 3 book at the same time");

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
    }
}