using UserEntity = Core.DataAccess.Context.Entities.User;

namespace Core.DataAccess.Repositories.User;

public interface IUserRepository
{
    Task<IEnumerable<UserEntity>> GetAllAsync();
    Task<IEnumerable<UserEntity>> SearchByEmailAsync(string? email);
    Task<UserEntity?> GetByEmailAsync(string email);
    Task<UserEntity?> GetByIdAsync(int id);
    Task UpdateAsync(UserEntity user);
}
