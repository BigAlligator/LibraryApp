﻿// <auto-generated />
using System;
using LibraryApp.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace LibraryApp.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20190505150644_SQL5")]
    partial class SQL5
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("LibraryApp.API.Models.Author", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AuthorName");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Gender");

                    b.Property<string>("Introduction");

                    b.Property<string>("KnownAs");

                    b.Property<string>("PhotoURL");

                    b.HasKey("Id");

                    b.ToTable("Authors");
                });

            modelBuilder.Entity("LibraryApp.API.Models.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AuthorId");

                    b.Property<string>("BookName");

                    b.Property<string>("IntroDetail");

                    b.Property<string>("IntroHilight");

                    b.Property<bool>("IsEbook");

                    b.Property<int>("Isbn");

                    b.Property<string>("MainGenre");

                    b.Property<string>("PhotoURL");

                    b.Property<DateTime>("PublishedDate");

                    b.Property<string>("SubGenre");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("LibraryApp.API.Models.BookLoan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId");

                    b.Property<DateTime>("LoanDate");

                    b.Property<DateTime>("ReturnDate");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("BookLoans");
                });

            modelBuilder.Entity("LibraryApp.API.Models.Borrow", b =>
                {
                    b.Property<int>("BorrowerId");

                    b.Property<int>("BookId");

                    b.Property<DateTime>("LoanDate");

                    b.Property<DateTime>("ReturnDate");

                    b.HasKey("BorrowerId", "BookId", "LoanDate");

                    b.HasIndex("BookId");

                    b.ToTable("Borrows");
                });

            modelBuilder.Entity("LibraryApp.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<bool>("IsMain");

                    b.Property<string>("Url");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("LibraryApp.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Gender");

                    b.Property<string>("Interests");

                    b.Property<string>("Introduction");

                    b.Property<string>("KnownAs");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LibraryApp.API.Models.Value", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("LibraryApp.API.Models.Book", b =>
                {
                    b.HasOne("LibraryApp.API.Models.Author", "Author")
                        .WithMany("Books")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApp.API.Models.BookLoan", b =>
                {
                    b.HasOne("LibraryApp.API.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("LibraryApp.API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LibraryApp.API.Models.Borrow", b =>
                {
                    b.HasOne("LibraryApp.API.Models.Book", "Book")
                        .WithMany("Borrowers")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("LibraryApp.API.Models.User", "Borrower")
                        .WithMany("Books")
                        .HasForeignKey("BorrowerId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("LibraryApp.API.Models.Photo", b =>
                {
                    b.HasOne("LibraryApp.API.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
