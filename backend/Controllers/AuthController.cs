using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly MediShieldContext _context;
        private readonly JwtService _jwtService;

        public AuthController(
            MediShieldContext context,
            JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        public class UserRegisterRequest
        {
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        public class UserLoginRequest
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            [FromBody] UserRegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password) ||
                string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest(new
                {
                    message = "All fields (Name, Email, Password) are required."
                });
            }

            var email = request.Email.Trim().ToLower();

            var existingUser = await _context.Users
                .AnyAsync(u => u.Email.ToLower() == email);

            if (existingUser)
            {
                return BadRequest(new
                {
                    message = "Email is already registered."
                });
            }

            string passwordHash = HashPassword(request.Password);

            var newUser = new User
            {
                Name = request.Name.Trim(),
                Email = email,
                PasswordHash = passwordHash,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Welcome {newUser.Name}!",
                email = newUser.Email,
                status = "Registration Successful"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] UserLoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Email and password are required."
                });
            }

            var email = request.Email.Trim().ToLower();

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email);

            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            var passwordHash = HashPassword(request.Password);

            if (user.PasswordHash != passwordHash)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            var token = _jwtService.GenerateToken(user);

            return Ok(new
            {
                message = "Login successful.",
                token = token,
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email
                }
            });
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();

            var hashedBytes = sha256.ComputeHash(
                Encoding.UTF8.GetBytes(password)
            );

            return Convert.ToHexString(hashedBytes);
        }
    }
}