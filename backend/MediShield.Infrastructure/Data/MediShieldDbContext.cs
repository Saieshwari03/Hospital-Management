using Microsoft.EntityFrameworkCore;

namespace MediShield.Infrastructure.Data;

public class MediShieldDbContext : DbContext
{
    public MediShieldDbContext(DbContextOptions<MediShieldDbContext> options)
        : base(options)
    {
    }
}