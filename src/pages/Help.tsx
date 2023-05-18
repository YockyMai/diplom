import { Container, List, Table, Title } from "@mantine/core";
import React from "react";
import { Check } from "tabler-icons-react";

const Help = () => {
  return (
    <Container mt={100} size={"xl"}>
      <Title order={2}>Размер имеет значение</Title>
      <List size={"sm"} mt={"xl"} icon={<Check />}>
        <List.Item>
          У каждого бренда своя собственная таблица размеров.
        </List.Item>
        <List.Item>
          Даже у одного бренда в некоторых коллекциях (например, у PUMA,
          Converse, Reebok) размеры могут различаться.
        </List.Item>
        <List.Item>
          Пожалуйста, не путайте российский размер (RU) и европейский (EU),
          американский (US) и британский (UK) — они очень похожи, но всё-таки
          различаются.
        </List.Item>
        <List.Item>
          На коробке не указывается Российский размер. Он дан для ознакомления и
          переведен по рекомендациям брендов-производителей.
        </List.Item>
        <List.Item>
          Обратите внимание, размеры обуви в сантиметрах не равны размеру
          стельки в самой обуви. Например, в детской обуви внутренняя стелька
          должна быть больше, чтобы ребенку было комфортно и не было сдавливания
          в области пальцев.
        </List.Item>
      </List>

      <Title mt={"xl"} order={3}>
        Таблица размеров
      </Title>
      <Table mt={"xl"}>
        <thead>
          <tr>
            <th>Размер RU</th>
            <th>Размер EU</th>
            <th>Размер US</th>
            <th>Размер CM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>35,5</td>
            <td>36,5</td>
            <td>4,5</td>
            <td>23,5</td>
          </tr>
          <tr>
            <td>36,5</td>
            <td>37,5</td>
            <td>5</td>
            <td>23,5</td>
          </tr>
          <tr>
            <td>37,5</td>
            <td>38,5</td>
            <td>6</td>
            <td>24</td>
          </tr>
          <tr>
            <td>37</td>
            <td>38</td>
            <td>5,6</td>
            <td>24</td>
          </tr>
          <tr>
            <td>38</td>
            <td>39</td>
            <td>6,5</td>
            <td>24,5</td>
          </tr>
          <tr>
            <td>39</td>
            <td>40</td>
            <td>7</td>
            <td>25</td>
          </tr>
          <tr>
            <td>40</td>
            <td>41</td>
            <td>8</td>
            <td>26</td>
          </tr>
          <tr>
            <td>41</td>
            <td>42</td>
            <td>8,5</td>
            <td>26,5</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Help;
