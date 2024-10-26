// @ts-nocheck

import { useState } from 'react';
import Calendar from 'react-calendar'; // Новый календарь
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import { Typography } from '@mui/material';
import Image from 'next/image';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'react-calendar/dist/Calendar.css'; // Стили для календаря

export const CalendarComponent = ({ value, onChange, time, onTimeChange }) => {
  const [open, setOpen] = useState(false);
  const today = new Date();

  // Массив доступного времени с 7:00 AM до 8:00 PM
  const generateTimeOptions = () => {
    const timeOptions = [];
    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();

    for (let hour = 7; hour <= 20; hour++) {
      const period = hour < 12 ? 'AM' : 'PM';
      const formattedHour = hour <= 12 ? hour : hour - 12;

      if (value?.toDateString() !== today.toDateString() || hour > currentHour || (hour === currentHour && currentMinutes < 30)) {
        timeOptions.push(`${formattedHour}:00 ${period}`);
      }

      if (value?.toDateString() !== today.toDateString() || hour > currentHour || (hour === currentHour && currentMinutes < 60)) {
        timeOptions.push(`${formattedHour}:30 ${period}`);
      }
    }
    return timeOptions;
  };

  const handleConfirm = () => {
    setOpen(false); // Закрываем модальное окно
  };

  return (
    <>
      {/* Основной элемент */}
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "55%",
          justifyContent: "space-between",
          border: "1px solid #E0E0E0",
          borderRadius: "12px",
          padding: "8px 16px",
          "&:hover": {
            borderColor: "#FF8919", // Изменение цвета при наведении
          },
        }}
      >
        {/* Кнопка для открытия модального окна */}
        <Button
          onClick={() => setOpen(true)}
          sx={{
            all: "unset", // Убираем все стандартные стили
            flexDirection: "column",
            alignItems: "flex-start",
            display: "flex",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "unset", // Убираем изменение фона при наведении
            },
          }}
        >
          <Typography
            sx={{
              color: "#343A40",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "14px", // Подогнано под требования
              paddingBottom: "6px",
            }}
          >
            Move Date
          </Typography>
          <Typography fontWeight="light" color="#615D5D">
            {value ? `${value.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at ${time}` : 'Select Date & Time'}
          </Typography>
        </Button>

        <Button
          onClick={() => setOpen(true)}
          sx={{
            all: "unset",
            padding: "auto",
            cursor: "pointer",
            backgroundColor: "#FFF1C2",
            height: "48px",
            width: "29px", // Делаем кнопку квадратной
            display: "flex", // Flex-контейнер
            justifyContent: "center", // Центровка по горизонтали
            alignItems: "center", // Центровка по вертикали
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: "#FF8919", // Цвет при наведении
            },
          }}
        >
          <Image height={13} width={13} alt="" src="icons/calendar.svg" />
        </Button>
      </Sheet>

      {/* Модальное окно с календарем и выбором времени */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Sheet
          sx={{
            width: { xs: '90%', sm: '400px' },
            marginX: 'auto',
            marginTop: '10%',
            background: 'white',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
            {value ? `Selected: ${value.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at ${time}` : 'Select Move Date and Time'}
          </Typography>

          {/* Календарь */}
          <Calendar
            value={value || today}
            onChange={onChange} // Передаем изменение даты наверх
            minDate={today} // Не позволяем выбирать даты в прошлом
            view="month" // Ограничиваем просмотр только месяцем
            maxDetail="month" // Показываем только дни месяца, без переключения года
            minDetail="month" // Ограничиваем только месяцем
          />

          {/* Выбор времени */}
          <Typography sx={{ fontWeight: 600, fontSize: '16px', marginTop: '16px' }}>
            Select Time
          </Typography>
          <Select
            value={time}
            onChange={onTimeChange} // Передаем изменение времени наверх
            fullWidth
            sx={{ borderRadius: '12px' }}
          >
            {generateTimeOptions().map((timeOption) => (
              <MenuItem key={timeOption} value={timeOption}>
                {timeOption}
              </MenuItem>
            ))}
          </Select>

          {/* Кнопка подтверждения */}
          <Button
            onClick={handleConfirm}
            sx={{
              backgroundColor: '#FF8919',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '12px',
              ':hover': { backgroundColor: '#FF6700' },
            }}
          >
            Confirm
          </Button>
        </Sheet>
      </Modal>
    </>
  );
};
