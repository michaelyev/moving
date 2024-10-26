// @ts-nocheck

'use client'; // Required for state management in Next.js

import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { Typography } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';

const clutterImages = [
  '/images/clutter1.png', // Image for clutter level 1
  '/images/clutter2.png', // Image for clutter level 2
  '/images/clutter3.png', // Image for clutter level 3
  '/images/clutter4.png', // Image for clutter level 4
  '/images/clutter5.png', // Image for clutter level 5
  '/images/clutter6.png', // Image for clutter level 6
  '/images/clutter7.png', // Image for clutter level 7
  '/images/clutter8.png', // Image for clutter level 8
  '/images/clutter9.png', // Image for clutter level 9
];

export const ClutterSlide = ({ value, onChange }) => {
  const [clutterLevel, setClutterLevel] = React.useState(value || 1);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const tooltipTimeoutRef = React.useRef(null);
  const showDelayTimeoutRef = React.useRef(null);

  // Обновление значения при изменении слайдера
  const handleSliderChange = (event, newValue) => {
    setClutterLevel(newValue);
    onChange(newValue); // Обновление значения в родительском компоненте

    // Показать тултип
    setShowTooltip(true);

    // Сбросить таймер на закрытие тултипа
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
  };

  // Функция для задержки закрытия тултипа
  const handleSliderStop = () => {
    // Запустить таймер на закрытие тултипа
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 500); // Закрыть через 1 секунду после остановки движения
  };

  // Функция для задержки открытия тултипа
  const handleMouseEnter = () => {
    if (showDelayTimeoutRef.current) {
      clearTimeout(showDelayTimeoutRef.current); // Очистить предыдущую задержку
    }

    // Задержка перед показом тултипа (четверть секунды)
    showDelayTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 250); // 250 миллисекунд
  };

  // Убираем тултип при отведении мыши с ползунка
  const handleMouseLeave = () => {
    if (showDelayTimeoutRef.current) {
      clearTimeout(showDelayTimeoutRef.current); // Сбросить таймер, если мышь уходит до истечения задержки
    }
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 1000); // Закрыть через 1 секунду после убирания мыши
  };

  React.useEffect(() => {
    return () => {
      // Очистить таймеры при размонтировании компонента
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      if (showDelayTimeoutRef.current) {
        clearTimeout(showDelayTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ marginX: 'auto', pb: '8px', width: '100%' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        Clutter
      </Typography>

      {/* Slider with Tooltip displaying clutter image */}
      <Box
        sx={{ position: 'relative', width: '95%', mx: 'auto', mt: 2 }}
        onMouseEnter={handleMouseEnter} // Показать тултип при наведении с задержкой
        onMouseLeave={handleMouseLeave} // Скрыть тултип при отводе мыши
      >
        <Slider
          sx={{ width: '100%' }}
          aria-label="Clutter level"
          value={clutterLevel}
          onChange={handleSliderChange}
          onMouseDown={handleMouseEnter} // Открыть тултип при клике сразу
          onMouseUp={handleSliderStop} // Закрыть через 1 сек после отпускания
          step={1}
          marks
          min={1}
          max={9} // Based on the number of images we have
          valueLabelDisplay="auto"
        />

        {/* Tooltip-style Image Display */}
        {showTooltip && (
          <Sheet
            sx={{
              position: 'absolute',
              width: { xs: "90%", sm: "400px" },
              top: '-250px',
              left: '50%', // Always center the tooltip
              transform: 'translateX(-50%)', // Center the tooltip relative to slider
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              zIndex: 1000,
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: '18px', mb: 1 }}>
              Clutter Level: {clutterLevel}
            </Typography>

            {/* Display the image corresponding to the clutter level */}
            <Image
              src={clutterImages[clutterLevel - 1]} // Subtract 1 because array index starts from 0
              alt={`Clutter level ${clutterLevel}`}
              width={280}
              height={180}
              style={{ borderRadius: '8px' }}
            />
          </Sheet>
        )}
      </Box>

      <Sheet sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
        <Typography fontWeight="light" color="#615D5D">
          Minimal
        </Typography>
        <Typography fontWeight="light" color="#615D5D">
          Heavy
        </Typography>
      </Sheet>
    </Box>
  );
};
