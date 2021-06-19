import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";

import moment from "moment";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const nowDate =  moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = nowDate.clone().add(1, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: nowDate.toDate(),
  end: endDate.toDate()
}

export const CalendarModal = () => {

  const dispatch = useDispatch();

  const {modalOpen} = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);

  const [dataStart, setDataStart] = useState(nowDate.toDate());
  const [dataEnd, setDataEnd] = useState(endDate.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const {notes, title, start, end} = formValues;

  useEffect(() => {
    if(activeEvent){
      setFormValues(activeEvent);
    }else{
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);


  const handleInputChange = ({target}) => {
      setFormValues({
          ...formValues,
          [target.name]: target.value
      });
  }

  const closeModal = () => {

    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);

    
  };

  const handleStartDateChange = (e) => {
      setDataStart(e);
      setFormValues({
          ...formValues,
          start: e
      });
  }

  const handleEndDateChange = (e) => {
    setDataEnd(e);
    setFormValues({
        ...formValues,
        end: e
    });
  }

  const handleSubmitForm = (e) => {
      e.preventDefault();

      const momentStart = moment(start);
      const momentEnd = moment(end);

      if(momentStart.isSameOrAfter(momentEnd)){
        Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
        return;
      }

      if (title.trim().length <= 2) {
        return setTitleValid(false)
      }

      if(activeEvent){
        dispatch(eventStartUpdate(formValues))
      }else{
        // realizar grabacion
        dispatch(eventStartAddNew(formValues));
      }

      setTitleValid(true);
      closeModal();

  }

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {(activeEvent) ? 'Actualizar':'Nuevo'} evento </h1>
      <hr />
      <form className="container"
            onSubmit={handleSubmitForm}>

        <div className="form-group">
          <label>Fecha y hora inicio</label>
            <DateTimePicker
                onChange={handleStartDateChange}
                value={dataStart}
                className="form-control"
            />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
                onChange={handleEndDateChange}
                value={dataEnd}
                className="form-control"
                minDate={dataStart}
            />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder={`${titleValid ? 'Título del evento': 'Obligatorio'}`}
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
