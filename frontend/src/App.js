import "./app.css";
import React from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import { format } from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
import { colors } from "@material-ui/core";

function App() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 21.027216,
    longitude: 105.853903,
    zoom: 13,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };

  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          width="100%"
          height="100%"
          {...viewport}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          onViewportChange={(viewport) => setViewport(viewport)}
          onDblClick={currentUsername && handleAddClick}
        >
          {pins.map((p) => (
            <>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-2 * viewport.zoom}
                offsetTop={-2.5 * viewport.zoom}
              >
                <Room
                  style={{
                    fontSize: 3 * viewport.zoom,
                    color:
                      currentUsername === p.username ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  key={p._id}
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="card">
                    <label>Vị trí</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Bình luận</label>
                    <p className="desc">{p.desc}</p>
                    <label>Đánh giá</label>
                    <div className="stars">
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <label>Thông tin</label>
                    <span className="username">
                      Tạo bởi <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {newPlace && (
            <>
              <Marker
                latitude={newPlace.lat}
                longitude={newPlace.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <Room
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color: "tomato",
                    cursor: "pointer",
                  }}
                />
              </Marker>
              <Popup
                latitude={newPlace.lat}
                longitude={newPlace.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setNewPlace(null)}
                anchor="left"
              >
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>Tiêu đề</label>
                    <input
                      placeholder="Enter a title"
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Mô tả</label>
                    <textarea
                      placeholder="Say us something about this place."
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label>Đánh giá</label>
                    <select onChange={(e) => setStar(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button type="submit" className="submitButton">
                      Thêm thẻ
                    </button>
                  </form>
                </div>
              </Popup>
            </>
          )}
        </ReactMapGL>
      </div>
      <div>
        <nav>
          <div class="navbar">
            <div class="logo">
              <a href="#">HÀ NỘI </a>
            </div>
            <ul class="menu">
              <li>
                <a href="#Home">Trang chủ</a>
              </li>
              <li>
                <a href="#About">Lịch sử</a>
              </li>
            </ul>
          </div>
        </nav>
        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Đăng Xuất
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Đăng nhập
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Đăng kí
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        )}
        <section id="Home">
          <div>
            <div>
              <h1 style={{fontSize:"150px"}}> THỦ ĐÔ HÀ NỘI</h1>
            </div>
            <div>
              <a href="https://vi.wikipedia.org/wiki/H%C3%A0_N%E1%BB%99i">
                <button class="nutxemthem2">XEM THÊM</button>
              </a>
            </div>
          </div>
        </section>
        <section id="About">
          <div
            style={{
              height: "90vh",
              width: "70%",
              backgroundImage: 'url("/components/image/Hanoi1.jpg")',
            }}
          >
            <div>
              <h2 style={{ height: "20vh", marginBottom: "50px" }}>LỊCH SỬ</h2>
            </div>
            <div
              style={{
                height: "70vh",
                width: "70%",
                fontSize: "20px",
              }}
            >
              <p>
                Hà Nội không chỉ được biết đến là Thủ đô của Việt Nam mà đây còn
                là trung tâm chính trị, kinh tế, văn hóa lớn của đất nước. Lịch
                sử Hà Nội gắn liền với những thăng trầm của dân tộc, từng là
                kinh đô của hầu hết các triều đại phong kiến. Hà Nội nằm ở phía
                Tây Bắc của đồng bằng sông Hồng, phía Bắc giáp Thái Nguyên, Vĩnh
                Phúc, phía Đông giáp Bắc Giang, Bắc Ninh, Hưng Yên, phía Tây
                giáp Hòa Bình, Phú Thọ và phía Nam giáp với Hà Nam, Hòa Bình.
                Với những dấu ấn đặc biệt đó cùng với cảnh quan thiên nhiên đẹp,
                hội tụ nhiều công trình, di tích độc đáo, Hà Nội đã trở thành
                điểm đến hấp dẫn đối với cả khách du lịch trong nước và quốc tế.{" "}
              </p>
              <div style={{ alignItems: "center", justifyContent: "center" }}>
                <a href="https://vi.wikipedia.org/wiki/H%C3%A0_N%E1%BB%99i#L%E1%BB%8Bch_s%E1%BB%AD">
                <button class="nutxemthem">TÌM HIỂU</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="button">
        <a href="#Home">
          <i class="fas fa-arrow-up"></i>
        </a>
      </div>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="footer-col">
              <h4>Đồ Án Nhóm </h4>
              <ul>
                <li>
                  <a href="#">Khánh</a>
                </li>
                <li>
                  <a href="#">Đức</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Trợ giúp</h4>
              <ul>
                <li>
                  <a href="#">Trang chủ</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
