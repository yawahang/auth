using Core.DataAccess.Repositories.User;
using Core.Domain.User.DTOs;
using Mapster;

namespace Core.Domain.User.Service;

public class UserService(IUserRepository repo) : IUserService
{
    public async Task<IEnumerable<UserDto>> GetAllAsync()
    {
        var users = await repo.GetAllAsync();
        return users.Adapt<IEnumerable<UserDto>>();
    }

    public async Task<IEnumerable<UserDto>> SearchByEmailAsync(string? email)
    {
        var users = await repo.SearchByEmailAsync(email);
        return users.Adapt<IEnumerable<UserDto>>();
    }

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await repo.GetByIdAsync(id);
        return user?.Adapt<UserDto>();
    }

    public async Task<UserDto?> GetByEmailAsync(string email)
    {
        var user = await repo.GetByEmailAsync(email);
        return user?.Adapt<UserDto>();
    }

    public async Task UpdateAsync(UserUpdateDto dto)
    {
        var existingUser = await repo.GetByIdAsync(dto.Id)
            ?? throw new KeyNotFoundException($"User {dto.Id} was not found.");

        existingUser.FullName = dto.FullName;
        existingUser.Email = dto.Email;
        existingUser.Status = dto.Status;

        await repo.UpdateAsync(existingUser);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await repo.GetByIdAsync(id) is not null;
    }
}
