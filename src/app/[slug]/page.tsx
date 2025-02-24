import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { db } from "@/lib/prisma";
import { get } from "http";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{slug: string}>;
}


const RestaurantePage = async ({params}: RestaurantPageProps) => {
    const {slug} = await params;
    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) {
        return notFound();
    }
    return <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
        {/* Logo com o nome do Restaurante*/}
        <div className="flex flex-col items-center gab-2">
            <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={82} height={82}/>
            <h2 className="fonts-semibold">
                {restaurant.name}
            </h2>

        {/* Frases abaixo do logo */}
        </div>
        <div className="pt-24 text-center space-y-2">
            <h3 className="text-2xl font-semibold">
                Seja Bem-Vindo
            </h3>
            <p className="opacity-55">
            Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada detalhe!
            </p>
        </div>
        <div className="pt-14 grid grid-cols-2 gap-4">
            <ConsumptionMethodOption imageUrl="/dine_in.png" imageAlt="Comer aqui" buttonText="Para Comer Aqui"/> {/* Interface para deixar o cod mais legivel*/}
            <ConsumptionMethodOption imageUrl="/takeaway.png" imageAlt="Para Levar" buttonText="Para Levar"/>
        </div>
    </div>;

}

export default RestaurantePage;