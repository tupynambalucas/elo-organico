# API Implementation Patterns

The backend follows a domain-based layered architecture using Fastify 5 and Mongoose.

## Layers of Responsibility

### 1. Controller
Responsible for handling HTTP I/O, extracting parameters, invoking the service, and mapping results to DTOs.

```typescript
// Example: cycle.controller.ts
export class CycleController {
  constructor(private readonly service: CycleService) {}

  public getActiveCycleHandler: FastifyZodHandler<Record<string, never>> = async (
    _req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const activeCycle = await this.service.getActive();
    if (!activeCycle) {
      void reply.status(204).send();
      return;
    }
    void reply.send(this.mapToResponse(activeCycle));
  };

  private mapToResponse(cycle: ICycleDocument): CycleResponse {
    const obj = cycle.toObject();
    return {
      ...obj,
      _id: obj._id.toString(),
      // Additional mapping...
    };
  }
}
```

### 2. Service (SOLID: SRP & DI)
Orchestrates business rules and manages transactions. Depends on repository interfaces.

```typescript
// Example: cycle.service.ts
export class CycleService {
  constructor(
    private readonly cycleRepo: ICycleRepository,
    private readonly productService: ProductService,
    private readonly mongoose: Mongoose,
  ) {}

  public async createCycle(data: CreateCycleDTO): Promise<ICycleDocument> {
    const session = await this.mongoose.startSession();
    session.startTransaction();

    try {
      await this.cycleRepo.deactivateAll(session);
      // Business logic...
      await session.commitTransaction();
      return createdCycle;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
```

### 3. Repository (SOLID: Interface Segregation)
Abstracts data persistence.

```typescript
// Example: cycle.repository.ts
export class CycleRepository implements ICycleRepository {
  constructor(private readonly model: Model<ICycleDocument>) {}

  public async findActive(): Promise<ICycleDocument | null> {
    return this.model.findOne({ isActive: true }).populate('products').exec();
  }
}
```

## Code Guardrails
- **Floating Promises**: Always use `void reply.send()` or `void reply.status()`.
- **Transactions**: Use Mongoose sessions for operations that affect multiple documents.
- **Errors**: Use the `AppError` class for expected operational errors.
