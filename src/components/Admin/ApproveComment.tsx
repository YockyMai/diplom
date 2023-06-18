import React, { useEffect, useState } from "react";
import { Icomment } from "../../store/slices/commentsSlice";
import { $authHost, $host } from "../../http";
import { UserComment } from "../UI/UserComment";
import { Alert, Button, Divider, Modal, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { CirclePlus } from "tabler-icons-react";
import { CatalogSearch } from "../../modules/CatalogSearch";
import { AddProductSize } from "./AddProductSize";

const ApproveComment = () => {
  const [commentsModal, setCommentsModal] = useState(false);
  const [comments, setComments] = useState<Icomment[]>([]);

  useEffect(() => {
    $host.get("/api/comment/").then((res) => {
      setComments(res.data);
    });
  }, []);

  const approveComment = async (commentId: number) => {
    try {
      await $authHost.post("/api/comment/approve", { commentId });
      showNotification({ title: "Успешно!", message: "Комментарий одобрен!" });
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (e) {
      showNotification({
        title: "Ошибка",
        message: "Не удалось совершить действие!",
      });
    }
  };

  return (
    <div>
      <Alert title="Одобрить комментарии" icon={<CirclePlus />}>
        <Text>Одобрите комментарии которые будут видны всем пользователям</Text>
        <Button mt={10} onClick={() => setCommentsModal(true)}>
          Просмотреть комментарии
        </Button>
      </Alert>
      <Modal
        opened={commentsModal}
        onClose={() => setCommentsModal(false)}
        title="Списки комментариев"
        size="xl"
      >
        <div>
          {comments.length > 0 ? (
            <Stack spacing={"xl"}>
              {comments.map((comment) => (
                <Stack spacing={"sm"}>
                  <UserComment
                    createdAt={comment.createdAt}
                    user={comment.user}
                    value={comment.value}
                    productId={comment.productId}
                  />
                  <Button onClick={() => approveComment(comment.id)}>
                    Разрешить комментарий
                  </Button>
                </Stack>
              ))}
              <Divider />
            </Stack>
          ) : (
            <Text align={"center"}>Список пуст!</Text>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ApproveComment;
