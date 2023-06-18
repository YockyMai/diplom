import {
  Alert,
  Button,
  Modal,
  Select,
  SelectItem,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  DatabaseOff,
  MoodHappy,
  MoodSad,
  SquareMinus,
} from "tabler-icons-react";
import { deleteBrand, deleteType } from "../../http/adminApi";
import { getBrands, getTypes } from "../../http/getApi";
import { validError } from "../../utils/validError";

export const DeleteType = () => {
  const [modalIsOpen, setModalOpen] = useState(false);

  const [typeId, setTypeId] = useState("");
  const [typeData, setTypeData] = useState<SelectItem[]>([]);

  const [status, setStatus] = useState<null | "ok" | "success">(null);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    getTypes().then((types) => {
      const convertedArr: SelectItem[] = [];

      types?.forEach((typesItem) => {
        convertedArr.push({
          value: String(typesItem.id),
          label: typesItem.name,
        });
      });

      setTypeData(convertedArr);
    });
  }, []);

  const removeBrand = () => {
    if (typeId) {
      deleteType(typeId).then((res) => {
        setTypeId("");
        setStatus(res.status);
        setStatusText(res.message);

        let updatedTypes = typeData;
        updatedTypes.filter((type) => type.value !== typeId);

        setTypeData(updatedTypes);
      });
    }
  };

  const closeModal = () => {
    setTypeId("");
    setStatusText("");
    setStatus(null);
    setModalOpen(false);
  };
  return (
    <div>
      <Alert title="Удалить тип" icon={<SquareMinus />} color="red">
        <Text>
          <strong>Опасно! </strong> Отменить данное действие будет невозможно!
        </Text>
        <Button mt={10} color="red" onClick={() => setModalOpen(true)}>
          Удалить тип
        </Button>
      </Alert>
      <Modal title="Удалить тип" opened={modalIsOpen} onClose={closeModal}>
        <Stack>
          <Select
            value={typeId}
            data={typeData}
            onChange={(value) => value && setTypeId(value)}
            required
            searchable
            label="Выберите тип который хотите удалить"
            placeholder="Название"
          />
          <Button onClick={removeBrand} leftIcon={<DatabaseOff />} color="red">
            Удалить тип
          </Button>

          {status && (
            <Alert
              icon={status === "ok" ? <MoodHappy /> : <MoodSad />}
              color={status === "ok" ? "green" : "red"}
            >
              {statusText}
            </Alert>
          )}
        </Stack>
      </Modal>
    </div>
  );
};
