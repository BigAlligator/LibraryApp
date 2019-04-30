using System.Linq;
using System.Threading.Tasks;
using LibraryApp.API.Helper;
using LibraryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApp.API.Data
{
    public class AuthorShowRepository : IAuthorShowRepository
    {
        private readonly DataContext _context;

        public AuthorShowRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Author> GetAuthor(int id)
        {
            var author = await _context.Authors.FirstOrDefaultAsync(p => p.Id == id);
            return author;
        }

        public async Task<PagedList<Author>> GetAuthors(AuthorParams authorParams)
        {
            var authors =  _context.Authors.OrderByDescending(u => u.DateOfBirth).AsQueryable();
            
            
           if(authorParams.AuthorName == "ALL" )
            {
                if(!string.IsNullOrEmpty(authorParams.OrderBy))
                {
                    switch(authorParams.OrderBy)
                    {
                        case "A-Z":
                            authors = authors.OrderBy(u => u.AuthorName);
                            break;
                        default:
                            authors = authors.OrderByDescending(u => u.DateOfBirth);
                            break;

                    }
                 }
                return await PagedList<Author>.CreateAsync(authors, authorParams.PageNumber, authorParams.PageSize);
            }
            else
            {
                authors = authors.Where(p => p.AuthorName.ToLower().Contains(authorParams.AuthorName.ToLower()));
                if(!string.IsNullOrEmpty(authorParams.OrderBy))
                {
                    switch(authorParams.OrderBy)
                    {
                        case "A-Z":
                            authors = authors.OrderBy(u => u.AuthorName);
                            break;
                        default:
                            authors = authors.OrderByDescending(u => u.DateOfBirth);
                            break;

                    }
                 }
                return await PagedList<Author>.CreateAsync(authors, authorParams.PageNumber, authorParams.PageSize);
            }
            
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}