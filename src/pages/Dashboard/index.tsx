import { useEffect, useState } from "react";

// IMPORTAÇÃO DA API
import api from "../../services/api";

// IMPORTAÇÕES DO COMPONENTS
import Header from "../../components/Header";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";

// IMPORTAÇÕES DOS ESTILOS
import { FoodsContainer } from "./styles";

// IMPORTÇÕES DOS INTERFACES
import { IFood } from "../../types";

type IFoodProps = Omit<IFood, "id">;

const Dashboard = () => {
  const [openModal, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [foods, setFoods] = useState<IFood[]>([]);

  const toggleModal = () => {
    setModalOpen(!openModal);
  };

  const handleAddFood = async (food: IFoodProps) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: IFood) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });
      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );
      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter((food) => food.id !== id);
    setFoods(foodsFiltered);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: IFood) => {
    setEditingFood(food);
    setEditModalOpen(!editModalOpen);
  };

  useEffect(() => {
    async function getFoods() {
      const response = await api.get("/foods");
      setFoods(response.data);
    }

    getFoods();
  }, []);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={openModal}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods?.map((food) => (
          <Food
            key={food.id}
            food={food}
            handleDelete={() => handleDeleteFood(food.id)}
            handleEditFood={() => handleEditFood(food)}
          />
        ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
