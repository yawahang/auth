using Core.DataAccess.Context;
using Microsoft.EntityFrameworkCore;
using UserEntity = Core.DataAccess.Context.Entities.User;

namespace Core.DataAccess.Repositories.Auth;

public class AuthRepository(ApplicationDbContext context) : IAuthRepository
{
    public async Task<UserEntity?> GetByEmailAsync(string email)
    {
        return await context.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<UserEntity?> GetUserDetailsAsync(string refreshToken)
    {
        return await context.Users.FirstOrDefaultAsync(x => x.RefreshTokens == refreshToken);
    }

    public async Task SaveUserChanges(UserEntity user)
    {
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
    }

    public async Task UpdateUserChanges(UserEntity user)
    {
        context.Users.Update(user);
        await context.SaveChangesAsync();
    }
}
