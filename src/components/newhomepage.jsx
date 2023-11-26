import { TrophyIcon } from "@heroicons/react/24/outline";
import HomepageProviderSearch from "@/components/homeprovidersearch";
import HomepageProviderSearchNew from "@/components/homeprovidersearchNew";
const NewHomepage = (props) => {
  return (
    <>
      <div
        class="relative mt-0 overflow-hidden md:mt-18 bg-gradient-to-b from-gray-50 to-white py-32"
        style={{ backgroundImage: "url('/home/bg.jpg')" }}
      >
        <HomepageProviderSearchNew />
      </div>
    </>
  );
};
export default NewHomepage;
