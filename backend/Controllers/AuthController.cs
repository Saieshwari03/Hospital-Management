using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly MediShieldContext _context;

        public AuthController(MediShieldContext context)
        {
            _context = context;
        }

        public class UserRegisterRequest
        {
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password) || string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest(new { message = "All fields (Name, Email, Password) are required." });
            }

            // Check if user already exists
            var existingUser = await _context.Users.AnyAsync(u => u.Email == request.Email);
            if (existingUser)
            {
                return BadRequest(new { message = "Email is already registered." });
            }

            // Hash password using SHA256
            string passwordHash = HashPassword(request.Password);

            var newUser = new User
            {
                Name = request.Name,
                Email = request.Email,
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

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToHexString(hashedBytes);
        }
    }
}
