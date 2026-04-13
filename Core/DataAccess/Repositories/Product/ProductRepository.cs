using Core.DataAccess.Context;
using Microsoft.EntityFrameworkCore;
using ProductEntity = Core.DataAccess.Context.Entities.Product;

namespace Core.DataAccess.Repositories.Product;

public class ProductRepository(ApplicationDbContext context) : IProductRepository
{
    public async Task<IEnumerable<ProductEntity>> GetAllAsync()
    {
        return await context.Products
            .OrderBy(product => product.Id)
            .ToListAsync();
    }

    public async Task<ProductEntity?> GetByIdAsync(int id)
    {
        return await context.Products.FindAsync(id);
    }

    public async Task<ProductEntity> CreateAsync(ProductEntity product)
    {
        context.Products.Add(product);
        await context.SaveChangesAsync();
        return product;
    }

    public async Task UpdateAsync(ProductEntity product)
    {
        context.Products.Update(product);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(ProductEntity product)
    {
        context.Products.Remove(product);
        await context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await context.Products.AnyAsync(x => x.Id == id);
    }
}
