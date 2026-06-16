# API Implementation Patterns

O backend segue uma arquitetura em camadas baseada em domínios, utilizando Fastify 5 e Mongoose.

## Camadas de Responsabilidade

### 1. Controller
Responsável por lidar com I/O HTTP, extrair parâmetros, invocar o serviço e mapear resultados para DTOs.

```typescript
// Exemplo: cycle.controller.ts
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
      // Mapeamentos adicionais...
    };
  }
}
```

### 2. Service (SOLID: SRP & DI)
Orquestra regras de negócio e gerencia transações. Depende de interfaces de repositório.

```typescript
// Exemplo: cycle.service.ts
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
      // Lógica de negócio...
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
Abstrai a persistência de dados.

```typescript
// Exemplo: cycle.repository.ts
export class CycleRepository implements ICycleRepository {
  constructor(private readonly model: Model<ICycleDocument>) {}

  public async findActive(): Promise<ICycleDocument | null> {
    return this.model.findOne({ isActive: true }).populate('products').exec();
  }
}
```

## Guardrails de Código
- **Floating Promises**: Sempre use `void reply.send()` ou `void reply.status()`.
- **Transactions**: Use sessões do Mongoose para operações que afetam múltiplos documentos.
- **Errors**: Use a classe `AppError` para erros previstos.
