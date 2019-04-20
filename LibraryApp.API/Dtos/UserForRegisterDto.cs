using System.ComponentModel.DataAnnotations;
using System;


namespace LibraryApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(20, MinimumLength=8, ErrorMessage = "Your password lenght is invalid")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string City { get; set; }

        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        public UserForRegisterDto()
        {
            this.CreatedDate = DateTime.Now;
        }


    }
}