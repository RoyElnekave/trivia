/* eslint-disable react/prop-types */
const CategorySelector = ({ selectedCategories, categories, handleContinue, setSelectedCategories, setShowFlagSlector }) => {
  const handleCategorySelection = (category) => {
    if (category === "All") {
      if (selectedCategories.length === categories.length) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories([...categories]);
      }
    } else {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
    setShowFlagSlector(true);
  };
  return (
    <div className="w-[800px] max-w-[90%] bg-white shadow-md rounded-lg overflow-hidden px-6 py-4 mx-auto mt-20">
      <h1 className="text-lg font-semibold">Select Categories</h1>
      <p className="text-sm">Please select categories. You can select multiple categories. Question show related to selected categories.</p>
      <hr className="my-3" />
      <div className="flex flex-wrap gap-2 my-4">
        <button
          className={`p-2 border-none outline-none rounded-md ${
            selectedCategories.includes("All") ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleCategorySelection("All")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`p-2 border-none outline-none rounded-md ${
              selectedCategories.includes(category) ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleCategorySelection(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <hr className="my-3" />
      <button
        className=" p-2 bg-green-500 rounded-md text-white font-semibold"
        onClick={handleContinue}
        disabled={selectedCategories.length === 0}
      >
        Continue
      </button>
    </div>
  );
};
export default CategorySelector;
