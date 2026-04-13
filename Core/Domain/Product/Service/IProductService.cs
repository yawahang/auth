using Core.Domain.Product.DTOs;

namespace Core.Domain.Product.Service;

public interface IProductService
{
    Task<IEnumerable<ProductReadDto>> GetAllAsync();
    Task<ProductReadDto?> GetByIdAsync(int id);
    Task<ProductReadDto> CreateAsync(ProductCreateDto dto);
    Task UpdateAsync(ProductUpdateDto dto);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}
