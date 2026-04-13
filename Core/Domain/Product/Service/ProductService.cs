using Core.DataAccess.Repositories.Product;
using Core.Domain.Product.DTOs;
using Mapster;
using ProductEntity = Core.DataAccess.Context.Entities.Product;

namespace Core.Domain.Product.Service;

public class ProductService(IProductRepository repo) : IProductService
{
    public async Task<IEnumerable<ProductReadDto>> GetAllAsync()
    {
        var data = await repo.GetAllAsync();
        return data.Select(x => new ProductReadDto
        {
            Id = x.Id,
            Name = x.Name,
            Price = x.Price
        });
    }

    public async Task<ProductReadDto?> GetByIdAsync(int id)
    {
        var item = await repo.GetByIdAsync(id);
        return item?.Adapt<ProductReadDto>();
    }

    public async Task<ProductReadDto> CreateAsync(ProductCreateDto dto)
    {
        var product = dto.Adapt<ProductEntity>();
        var created = await repo.CreateAsync(product);
        return created.Adapt<ProductReadDto>();
    }

    public async Task UpdateAsync(ProductUpdateDto dto)
    {
        var product = dto.Adapt<ProductEntity>();
        await repo.UpdateAsync(product);
    }

    public async Task DeleteAsync(int id)
    {
        var product = await repo.GetByIdAsync(id);
        if (product != null)
        {
            await repo.DeleteAsync(product);
        }
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await repo.ExistsAsync(id);
    }
}
