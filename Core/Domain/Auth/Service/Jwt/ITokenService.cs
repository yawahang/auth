using UserEntity = Core.DataAccess.Context.Entities.User;

namespace Core.Domain.Auth.Service.Jwt;

public interface ITokenService
{
    string GenerateAccessToken(UserEntity user);
    string GenerateRefreshToken(UserEntity user);
}
