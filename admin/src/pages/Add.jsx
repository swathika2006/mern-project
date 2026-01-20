import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";
const Add = ({token}) => {
  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setsubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendURL + "/api/product/add",
        formData,
        {headers:{token}}
      );
      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setimage1(false)
        setimage2(false)
        setimage3(false)
        setimage4(false)
      }
        else{
          toast.error(response.data.message)
        }
      
    } catch (e) {
      console.log("Message:", e.message);
      console.log("Status:", e.response?.status);
      console.log("Data:", e.response?.data);
      toast.error(error.message)
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => {
                setimage1(e.target.files[0]);
              }}
              type="file"
              name="image1"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => {
                setimage2(e.target.files[0]);
              }}
              type="file"
              name="image2"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => {
                setimage3(e.target.files[0]);
              }}
              type="file"
              id="image3"
              name="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => {
                setimage4(e.target.files[0]);
              }}
              type="file"
              id="image4"
              name="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          name="name"
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          name="description"
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="div">
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            name="category"
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="div">
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => {
              setsubCategory(e.target.value);
            }}
            name="subcategory"
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="div">
          <p className="mb-2 ">Product Price</p>
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
            name="price"
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div className="mb-2">
        <p>Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
            className="div"
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
            className="div"
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
            className="div"
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
            className="div"
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
            className="div"
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          name="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />

        <label className="cursor-pointer" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        Add
      </button>
    </form>
  );
};

export default Add;
