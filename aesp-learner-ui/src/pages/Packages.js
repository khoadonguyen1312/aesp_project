import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Card, Button, Row, Col } from "antd";

function Packages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    API.get("/learner/packages").then((res) => setPackages(res.data));
  }, []);

  const handleBuy = (pkg) => alert(`Đã chọn gói: ${pkg.name}`);

  return (
    <div>
      <h2>Available Packages</h2>
      <Row gutter={16} className="mt-4">
        {packages.map((pkg) => (
          <Col span={8} key={pkg.id}>
            <Card title={pkg.name} bordered={false}>
              <p>{pkg.description}</p>
              <p><strong>${pkg.price}</strong></p>
              <Button type="primary" onClick={() => handleBuy(pkg)}>Buy Now</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Packages;
