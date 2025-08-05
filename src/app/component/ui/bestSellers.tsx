import BestSellerCatalogue from "./bestSellerCatalogue";



const BestSellers = () => {
    

    return (
        <section className="py-8 w-full flex items-center justify-center">
            <article className="w-full max-w-[1116px] px-3">
                <div className="mb-6 text-center">
                    <p className="text-gray-500 text-xs font-medium font-inter uppercase leading-normal tracking-wide">Shop Now</p>
                    <h2 className="text-gray-900 text-2xl font-bold font-inter">Best Selling</h2>
                </div>


                <BestSellerCatalogue />
                
            </article>
        </section>
    );
};

export default BestSellers;
