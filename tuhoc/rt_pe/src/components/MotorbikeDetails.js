import axios from "axios";
import { use, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function MotobikesDetails() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [notFound, setNotFound] = useState(false);
  // id: lấy từ URL (ví dụ khi truy cập /motorbikes/3 thì id = "3").
  // bike: state lưu thông tin motorbike sau khi fetch API. Ban đầu là null.
  // notFound: flag để báo 404 khi không tìm thấy xe.
  useEffect(() => {
    axios
      .get(`http://localhost:3001/Motorbikes/${id}`)
      .then((res) => {
        if (res.data) {
          setBike(res.data);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true));
  }, [id]);
  // Khi component render hoặc id thay đổi → gọi API http://localhost:3001/Motorbikes/{id}.
  // Nếu API trả về dữ liệu (res.data) → lưu vào bike.
  // Nếu không có data hoặc lỗi xảy ra → set notFound = true.
  if (notFound) {
    return <h2 className="text-center mt-5">404 - Motorbike Not Found</h2>;
  }

  if (!bike) {
    return <p className="text-center mt-5">Loading...</p>;
  }
  // Nếu notFound === true → hiện thông báo 404.
  // Nếu chưa có dữ liệu (bike === null) → hiện "Loading...".
  // Nếu đã có dữ liệu → render chi tiết motorbike.
  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-3">
        <h2>
          {bike.brand} {bike.model}
        </h2>
        <p>{bike.description}</p>
        <p>
          Year: {bike.year} | Price: {bike.price}
        </p>
        <img
          src={bike.image}
          alt={bike.model}
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </Card>
    </Container>
  );
}
export default MotobikesDetails;
