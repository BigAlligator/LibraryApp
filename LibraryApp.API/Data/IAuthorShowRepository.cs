
using System.Threading.Tasks;
using LibraryApp.API.Helper;
using LibraryApp.API.Models;

namespace LibraryApp.API.Data
{
    public interface IAuthorShowRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T> (T entity) where T: class;

         Task<bool> SaveAll();

         Task<PagedList<Author>> GetAuthors(AuthorParams authorParams);

         Task<Author> GetAuthor(int id);
    }
}