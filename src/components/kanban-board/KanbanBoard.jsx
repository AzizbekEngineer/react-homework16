import React, { useEffect, useRef, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { DATA } from "@/static";
import emptyImg from "../../assets/images/empty.png";
import "./kanban.scss";

const KanbanBoard = () => {
  const [data, setData] = useState(DATA);
  const [status, setStatus] = useState(null);

  let title = useRef();
  let desc = useRef();

  let statuses = ["ready", "working", "stuck", "done"];

  localStorage.setItem("kanbanData", JSON.stringify(data));

  let time = new Date();
  const filterByItems = (status) => {
    return data
      ?.filter((el) => el.status === status)
      ?.map((el) => (
        <div key={el.id} className="kanban__item">
          <div className="item__top">
            <p>{el.title}</p>
            <button
              onClick={() => handleDelete(el.id)}
              className="delete__item"
            >
              <MdDeleteForever className="delete__icon" />
            </button>
          </div>
          <p className="kanban__commit">{el.desc}</p>
          <div className="kanban__info">
            <select
              value={el.status}
              onChange={(e) => handleStatusChange(el.id, e.target.value)}
            >
              {statuses?.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <span>
              {time.getHours()}:{time.getMinutes()}
            </span>
          </div>
        </div>
      ));
  };

  const handleDelete = (id) => {
    if (confirm("Malumot ochirilsinmi")) {
      setData((prev) => prev.filter((el) => el.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = new Date().getTime();

    let newItem = {
      id,
      title: title.current.value,
      desc: desc.current.value,
      status,
    };
    setData((prev) => [...prev, newItem]);
    setStatus(null);
    title.current.value = "";
    desc.current.value = "";
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button className="kanban__btn" onClick={() => setStatus("ready")}>
              Add
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            action=""
            className={`kanban__form ${status ? "show" : ""}`}
          >
            <div className="close__form" onClick={() => setStatus(null)}>
              <FaWindowClose className="close__icon" />
            </div>
            <input required ref={title} type="text" placeholder="title" />
            <input required ref={desc} type="text" placeholder="desc" />
            <button className="kanban__create__btn">Create</button>
          </form>

          <div className="kanban__wrapper">
            <div className="kanban__box ready">
              <div className="kanban__heading">
                <p>Ready to start / {filterByItems("ready").length}</p>
              </div>
              <div className="kanban__block">
                {filterByItems("ready").length > 0 ? (
                  filterByItems("ready")
                ) : (
                  <img src={emptyImg} alt="" />
                )}
              </div>
              <button
                onClick={() => setStatus("ready")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            <div className="kanban__box working">
              <div className="kanban__heading">
                <p>Working to start / {filterByItems("working").length}</p>
              </div>
              <div className="kanban__block">
                {filterByItems("working").length > 0 ? (
                  filterByItems("working")
                ) : (
                  <img src={emptyImg} alt="" />
                )}
              </div>
              <button
                onClick={() => setStatus("working")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            <div className="kanban__box stuck">
              <div className="kanban__heading">
                <p>Stuck to start / {filterByItems("stuck").length}</p>
              </div>
              <div className="kanban__block">
                {filterByItems("stuck").length > 0 ? (
                  filterByItems("stuck")
                ) : (
                  <img src={emptyImg} alt="" />
                )}
              </div>
              <button
                onClick={() => setStatus("stuck")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            <div className="kanban__box done">
              <div className="kanban__heading">
                <p>Done to start / {filterByItems("done").length}</p>
              </div>
              <div className="kanban__block">
                {filterByItems("done").length > 0 ? (
                  filterByItems("done")
                ) : (
                  <img src={emptyImg} alt="" />
                )}
              </div>
              <button
                onClick={() => setStatus("done")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
