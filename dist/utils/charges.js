"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcCharge = void 0;

const calcCondoSize = condoSize => {
  if (condoSize < 10) return '<10';else if (condoSize >= 10 && condoSize < 50) return '11-49';else if (condoSize >= 50 && condoSize <= 200) return '50-200';else if (condoSize > 200) return '>200';
};

const calcForSmallCondo = (row, isElevator, isHeating) => {
  const totalMeanCharge = row.service_none + (isElevator ? row.service_elevator : 0) + (isHeating ? row.service_heater : 0);
  const totalMinCharge = totalMeanCharge - row.service_none_std - (isElevator ? row.service_elevator_std : 0) - (isHeating ? row.service_heater_std : 0);
  const totalMaxCharge = totalMeanCharge + row.service_none_std + (isElevator ? row.service_elevator_std : 0) + (isHeating ? row.service_heater_std : 0);
  return {
    mean: totalMeanCharge,
    min: totalMinCharge,
    max: totalMaxCharge
  };
};

const calcForLargeCondo = (row, isElevator, isHeating, isEmployee) => {
  if (!isElevator && !isHeating && !isEmployee) {
    return {
      mean: row.service_none,
      min: row.service_none - row.service_none_std,
      max: row.service_none + row.service_none_std
    };
  } else if (isElevator && !isHeating && !isEmployee) return {
    mean: row.service_elevator,
    min: row.service_elevator - row.service_elevator_std,
    max: row.service_elevator + row.service_elevator_std
  };else if (isElevator && isHeating && !isEmployee) return {
    mean: row.service_elevator_heater,
    min: row.service_elevator_heater - row.service_elevator_heater_std,
    max: row.service_elevator_heater + row.service_elevator_heater_std
  };else if (isElevator && isHeating && isEmployee) return {
    mean: row.service_elevator_heater_employee,
    min: row.service_elevator_heater_employee - row.service_elevator_heater_employee_std,
    max: row.service_elevator_heater_employee + row.service_elevator_heater_employee_std
  };else if (isHeating && isEmployee && !isElevator) {
    return {
      mean: row.service_elevator_heater_employee - row.service_elevator,
      min: row.service_elevator_heater_employee - row.service_elevator_heater_employee_std - row.service_elevator - row.service_elevator_std,
      max: row.service_elevator_heater_employee + row.service_elevator_heater_employee_std - row.service_elevator + row.service_elevator_std
    };
  }
};

const calcCharge = (rows, condoSize, isElevator, isHeating, isEmployee) => {
  return rows.map(row => {
    if (calcCondoSize(condoSize) === row.condo_size) {
      if (condoSize < 50) {
        return calcForSmallCondo(row, isElevator, isHeating);
      } else {
        return calcForLargeCondo(row, isElevator, isHeating, isEmployee);
      }
    }
  }).filter(res => res)[0];
};

exports.calcCharge = calcCharge;