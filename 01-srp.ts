(() => {

    interface Product {
        id:   number;
        name: string;
    }

    // Esta clase solo se encarga de los productos.
    class ProductService {
        loadProduct( id: number ): Product {
            return { id, name: 'OLED Tv' };
        }

        saveProduct( product: Product ): void {
            console.log('Guardando en base de datos', product);
        }
    }

    class ClientNotifier {
        notifyClients(): void {
            console.log('Enviando correo a los clientes');
        }
    }

    class ShoppingCart {
        addProduct( productId: number ): void {
            console.log('Agregando al carrito ', productId);
        }
    }

    class ProductBloc {
        constructor(
            private readonly productService: ProductService,
            private readonly clientNotifier: ClientNotifier,
            private readonly shoppingCart: ShoppingCart,
        ) {}

        loadProduct( id: number ): void {
            const product = this.productService.loadProduct(id);
            console.log('Producto: ', product);
        }

        saveProduct( product: Product ): void {
            this.productService.saveProduct(product);
        }

        notifyClients(): void {
            this.clientNotifier.notifyClients();
        }

        onAddToCart( productId: number ): void {
            this.shoppingCart.addProduct(productId);
        }
    }

    const productBloc = new ProductBloc(
        new ProductService(),
        new ClientNotifier(),
        new ShoppingCart(),
    );

    productBloc.loadProduct(10);
    productBloc.saveProduct({ id: 10, name: 'OLED TV' });
    productBloc.notifyClients();
    productBloc.onAddToCart(10);

})();