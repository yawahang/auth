using UserEntity = Core.DataAccess.Context.Entities.User;

namespace Core.DataAccess.Repositories.Auth;

public interface IAuthRepository
{
    Task<UserEntity?> GetByEmailAsync(string email);
    Task<UserEntity?> GetUserDetailsAsync(string refreshToken);
    Task SaveUserChanges(UserEntity user);
    Task UpdateUserChanges(UserEntity user);
}
