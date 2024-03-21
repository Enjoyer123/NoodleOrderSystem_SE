// ProductsList.jsx
import NoodleCard from "./NoodleCard";

const ProductsList = () => {
  
  return (
    <div className="mt-16 container mx-auto">
      <h1 className="text-center text-3xl font-bold mb-4">THE BEST NOODLE</h1>
      <p className="pl-8 pr-8 text-lg text-gray-700 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className="flex flex-wrap justify-center">
      
          <NoodleCard />
          <NoodleCard />
          <NoodleCard />
          <NoodleCard />
          <NoodleCard />
          <NoodleCard />
          <NoodleCard />
          <NoodleCard />
          <NoodleCard />
      
      </div>
    </div>
  );
};

export default ProductsList;