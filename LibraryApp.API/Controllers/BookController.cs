using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using LibraryApp.API.Data;
using LibraryApp.API.Dtos;
using LibraryApp.API.Helper;
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
    }
}