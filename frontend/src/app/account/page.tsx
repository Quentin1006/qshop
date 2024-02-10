import Block from './_components/Block';

export default function Page() {
  return (
    <div className="m-auto h-full w-full max-w-[1000px]">
      <h1 className="py-4 text-3xl">Votre compte</h1>
      <div className="grid grid-cols-3 grid-rows-4 gap-3">
        <Block
          content="Suivre, retourner ou acheter à nouveau"
          title="Vos commandes"
          icon="http://localhost:5555/images/helpers/order._CB659956101_.png"
          link="/account/orders"
        />
        <Block
          content="Suivre, retourner ou acheter à nouveau"
          title="Adresses"
          icon="http://localhost:5555/images/helpers/address._CB657833298_.png"
          link="/account/addresses"
        />
        <Block
          content="Suivre, retourner ou acheter à nouveau retourner ou acheter à nouveau"
          title="Vos commandes"
          icon="http://localhost:5555/images/helpers/order._CB659956101_.png"
          link="/account/orders"
        />
        <Block
          content="Suivre, retourner ou acheter à nouveau"
          title="Vos commandes"
          icon="http://localhost:5555/images/helpers/order._CB659956101_.png"
          link="/account/orders"
        />
        <Block
          content="Suivre, retourner ou acheter à nouveau"
          title="Vos commandes"
          icon="http://localhost:5555/images/helpers/order._CB659956101_.png"
          link="/account/orders"
        />
      </div>
    </div>
  );
}
