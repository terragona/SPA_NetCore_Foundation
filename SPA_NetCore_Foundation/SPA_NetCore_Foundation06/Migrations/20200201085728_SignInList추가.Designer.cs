﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ModelDB;

namespace SPA_NetCore_Foundation06.Migrations
{
    [DbContext(typeof(SpaNetCoreFoundationContext))]
    [Migration("20200201085728_SignInList추가")]
    partial class SignInList추가
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ModelDB.User", b =>
                {
                    b.Property<long>("idUser")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Password");

                    b.Property<string>("SignEmail");

                    b.HasKey("idUser");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            idUser = 1L,
                            Password = "1111",
                            SignEmail = "test01@email.net"
                        },
                        new
                        {
                            idUser = 2L,
                            Password = "1111",
                            SignEmail = "test02@email.net"
                        });
                });

            modelBuilder.Entity("ModelDB.UserSignIn", b =>
                {
                    b.Property<long>("idUserSignIn")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("RefreshDate");

                    b.Property<string>("RefreshToken");

                    b.Property<DateTime>("SignInDate");

                    b.Property<long>("idUser");

                    b.HasKey("idUserSignIn");

                    b.ToTable("UserSignIn");
                });
#pragma warning restore 612, 618
        }
    }
}
