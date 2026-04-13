using Core.Domain.User.DTOs;

namespace Core.Domain.User.Service;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllAsync();
    Task<IEnumerable<UserDto>> SearchByEmailAsync(string? email);
    Task<UserDto?> GetByIdAsync(int id);
    Task<UserDto?> GetByEmailAsync(string email);
    Task UpdateAsync(UserUpdateDto dto);
    Task<bool> ExistsAsync(int id);
}
