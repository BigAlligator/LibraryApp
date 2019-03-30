using System.ComponentModel.DataAnnotations;

namespace LibraryApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }



        [Required]
        [StringLength(20, MinimumLength=8, ErrorMessage = "Your password lenght is invalid")]
        public string Password { get; set; }

    }
}