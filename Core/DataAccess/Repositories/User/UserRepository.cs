using Core.DataAccess.Context;
using Microsoft.EntityFrameworkCore;
using UserEntity = Core.DataAccess.Context.Entities.User;

namespace Core.DataAccess.Repositories.User;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    public async Task<IEnumerable<UserEntity>> GetAllAsync()
    {
        return await context.Users
            .OrderBy(user => user.Id)
            .ToListAsync();
    }

    public async Task<IEnumerable<UserEntity>> SearchByEmailAsync(string? email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return await GetAllAsync();
        }

        return await context.Users
            .Where(user => user.Email.Contains(email))
            .OrderBy(user => user.Id)
            .ToListAsync();
    }

    public async Task<UserEntity?> GetByEmailAsync(string email)
    {
        return await context.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<UserEntity?> GetByIdAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task UpdateAsync(UserEntity user)
    {
        context.Users.Update(user);
        await context.SaveChangesAsync();
    }
}
