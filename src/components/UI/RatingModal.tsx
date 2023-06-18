import { Alert, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import { InfoCircle, Star } from "tabler-icons-react";
import { $authHost } from "../../http";

interface RatingModal {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: number;
}

export const RatingModal: FC<RatingModal> = ({
  isOpen,
  setOpen,
  productId,
}) => {
  const availableRating = [1, 2, 3, 4, 5];
  const [ratingHover, setRatingHover] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const closeRatingModal = () => {
    setOpen(false);
    setRatingHover(0);
    setUserRating(0);
  };
  const handleRatingHover = (rating: number) => {
    setRatingHover(rating);
  };
  const handleSetUserRating = () => {
    setUserRating(ratingHover);
  };
  const sendUserRating = async () => {
    try {
      const response = await $authHost.post("/api/product/rating", {
        productId,
        rate: userRating,
      });

      if (response.status !== 200) {
        throw new Error("Server error");
      }
      closeRatingModal();
      showNotification({
        title: "Успешно",
        message: "Спасибо за оставленный отзыв",
      });
    } catch (error) {
      showNotification({
        color: "red",
        title: "Ошибка",
        message: "Вы уже оценивали этот товар",
      });
      closeRatingModal();
    }
  };
  return (
    <Modal
      closeOnEscape={true}
      opened={isOpen}
      onClose={closeRatingModal}
      title="Рейтинг"
    >
      <Alert icon={<InfoCircle />}>
        <Text align="center">Нажмите на звезду, чтобы поставить оценку</Text>
      </Alert>
      <Stack align="center">
        <Group
          grow
          onMouseLeave={() => setRatingHover(0)}
          style={{ cursor: "pointer" }}
          mt="xl"
        >
          {availableRating.map((rating, index) => (
            <Star
              key={rating}
              onMouseEnter={() => handleRatingHover(rating)}
              onClick={handleSetUserRating}
              size={22}
              fill={
                userRating === 0
                  ? index < ratingHover
                    ? "#f5cb25"
                    : "transparent"
                  : index < userRating
                  ? "#f5cb25"
                  : "transparent"
              }
              color="#f5cb25"
            />
          ))}
        </Group>
        {userRating === 0
          ? ratingHover === 0
            ? "—"
            : ratingHover
          : userRating}

        <Text align="center" color={"teal"}>
          Ваш комментарий появится на сайте после одобрения модерации!
        </Text>

        <Button
          color="yellow"
          variant="outline"
          mt="xl"
          disabled={userRating == 0}
          onClick={sendUserRating}
        >
          <Text weight={200}>Отправить</Text>
        </Button>
      </Stack>
    </Modal>
  );
};
