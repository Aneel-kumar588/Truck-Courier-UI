"use strict";

function fetchAndUpdateCounters() {
    fetch("http://localhost:5000/api/counters")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("Response status:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Received counters data:", data);
            // Update the DOM elements with the received data
            document.getElementById("on-route-vehicles").innerText = data.Total_Booking;
            document.getElementById("vehicles-with-errors").innerText = data.Total_Vehicle;
            // Uncomment and modify the following lines if additional counters are available
            // document.getElementById("deviated-from-route").innerText = data.travelsRoutesCounts;
            // document.getElementById("late-vehicles").innerText = data.Latevehicles;
        })
        .catch(error => {
            console.error("Error fetching counters data:", error);
        });
}

// Call the function to fetch and update counters
fetchAndUpdateCounters();





function initializeCharts() {
    let colors, headingColor;
    if (isDarkStyle) {
        headingColor = config.colors_dark.textMuted;
        colors = config.colors_dark;
    } else {
        headingColor = config.colors.textMuted;
        colors = config.colors;
    }

    const s = {
        line: {
            series1: colors.warning,
            series2: colors.primary,
            series3: "#7367f029"
        },
        donut: {
            series1: colors.success,
            series2: "rgba(113, 221, 55, 0.6)",
            series3: "rgba(113, 221, 55, 0.4)",
            series4: "rgba(113, 221, 55, 0.2)"
        }
    };

    const chartOptions1 = {
        series: [
            { name: "Shipment", type: "column", data: [38, 45, 33, 38, 32, 50, 48, 40, 42, 37] },
            { name: "Delivery", type: "line", data: [23, 28, 23, 32, 28, 44, 32, 38, 26, 34] }
        ],
        chart: {
            height: 270,
            type: "line",
            stacked: false,
            parentHeightOffset: 0,
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        markers: {
            size: 4,
            colors: [config.colors.white],
            strokeColors: s.line.series2,
            hover: { size: 6 },
            borderRadius: 4
        },
        stroke: { curve: "smooth", width: [0, 3], lineCap: "round" },
        legend: {
            show: true,
            position: "bottom",
            markers: { width: 8, height: 8, offsetX: -3 },
            height: 40,
            offsetY: 10,
            itemMargin: { horizontal: 10, vertical: 0 },
            fontSize: "15px",
            fontFamily: "Public Sans",
            fontWeight: 400,
            labels: { colors: headingColor, useSeriesColors: false }
        },
        grid: { strokeDashArray: 8 },
        colors: [s.line.series1, s.line.series2],
        fill: { opacity: [1, 1] },
        plotOptions: {
            bar: {
                columnWidth: "30%",
                startingShape: "rounded",
                endingShape: "rounded",
                borderRadius: 4
            }
        },
        dataLabels: { enabled: false },
        xaxis: {
            tickAmount: 10,
            categories: ["1 Jan", "2 Jan", "3 Jan", "4 Jan", "5 Jan", "6 Jan", "7 Jan", "8 Jan", "9 Jan", "10 Jan"],
            labels: {
                style: { colors: headingColor, fontSize: "13px", fontFamily: "Public Sans", fontWeight: 400 }
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            tickAmount: 4,
            min: 10,
            max: 50,
            labels: {
                style: { colors: headingColor, fontSize: "13px", fontFamily: "Public Sans", fontWeight: 400 },
                formatter: function(e) { return e + "%" }
            }
        },
        responsive: [
            {
                breakpoint: 1400,
                options: {
                    chart: { height: 270 },
                    xaxis: { labels: { style: { fontSize: "10px" } } },
                    legend: { itemMargin: { vertical: 0, horizontal: 10 }, fontSize: "13px", offsetY: 12 }
                }
            },
            {
                breakpoint: 1399,
                options: { chart: { height: 415 }, plotOptions: { bar: { columnWidth: "50%" } } }
            },
            {
                breakpoint: 982,
                options: { plotOptions: { bar: { columnWidth: "30%" } } }
            },
            {
                breakpoint: 480,
                options: { chart: { height: 250 }, legend: { offsetY: 7 } }
            }
        ]
    };

    const shipmentStatisticsChart = document.querySelector("#shipmentStatisticsChart");
    if (shipmentStatisticsChart !== null) {
        new ApexCharts(shipmentStatisticsChart, chartOptions1).render();
    }

    const chartOptions2 = {
        chart: {
            height: 420,
            parentHeightOffset: 0,
            type: "donut"
        },
        labels: ["Incorrect address", "Weather conditions", "Federal Holidays", "Damage during transit"],
        series: [13, 25, 22, 40],
        colors: [s.donut.series1, s.donut.series2, s.donut.series3, s.donut.series4],
        stroke: { width: 0 },
        dataLabels: { enabled: false },
        legend: {
            show: true,
            position: "bottom",
            offsetY: 10,
            markers: { width: 8, height: 8, offsetX: -3 },
            itemMargin: { horizontal: 15, vertical: 5 },
            fontSize: "13px",
            fontFamily: "Public Sans",
            fontWeight: 400,
            labels: { colors: headingColor, useSeriesColors: false }
        },
        tooltip: { theme: false },
        grid: { padding: { top: 15 } },
        plotOptions: {
            pie: {
                donut: {
                    size: "75%",
                    labels: {
                        show: true,
                        value: {
                            fontSize: "26px",
                            fontFamily: "Public Sans",
                            color: headingColor,
                            fontWeight: 500,
                            offsetY: -30,
                            formatter: function(e) { return parseInt(e) + "%" }
                        },
                        name: { offsetY: 20, fontFamily: "Public Sans" },
                        total: {
                            show: true,
                            fontSize: "0.7rem",
                            label: "AVG. Exceptions",
                            color: headingColor,
                            formatter: function(e) { return "30%" }
                        }
                    }
                }
            }
        },
        responsive: [{ breakpoint: 420, options: { chart: { height: 360 } } }]
    };

    const deliveryExceptionsChart = document.querySelector("#deliveryExceptionsChart");
    if (deliveryExceptionsChart !== null) {
        new ApexCharts(deliveryExceptionsChart, chartOptions2).render();
    }
}
// dt-booking-details-table
// Function to initialize DataTable
function initializeDataTable() {
    $(function() {
        const routeVehicles = $(".dt-route-vehicles");
        if (routeVehicles.length) {
            routeVehicles.DataTable({
                ajax: {
                    url: "http://localhost:5000/api/bookingList",
                    dataSrc: ""
                },
                columns: [
                    { data: "id" },
                    { data: "id" },
                    { data: "customer_name" },
                    { data: "from_city" },
                    { data: "to_city" },
                    { data: "pickup_date" },
                    { data: "tracking_id" }
                ],
                columnDefs: [
                    {
                        className: "control",
                        orderable: false,
                        searchable: false,
                        responsivePriority: 2,
                        targets: 0,
                        render: function() { return ""; }
                    },
                    {
                        targets: 1,
                        orderable: false,
                        searchable: false,
                        checkboxes: true,
                        responsivePriority: 3,
                        render: function() { return '<input type="checkbox" class="dt-checkboxes form-check-input">'; }
                    },
                    {
                        targets: 2,
                        responsivePriority: 1,
                        render: function(data, type, row) {
                            return `
                                <div class="d-flex justify-content-start align-items-center user-name">
                                    <div class="avatar-wrapper">
                                        <div class="avatar me-2">
                                            <span class="avatar-initial rounded-circle bg-label-secondary"><i class="bx bxs-truck"></i></span>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <a class="text-body fw-medium" href="app-logistics-fleet.html">VOL-${row.location}</a>
                                    </div>
                                </div>
                            `;
                        }
                    },
                    {
                        targets: 3,
                        render: function(data, type, row) {
                            return `<div class="text-body">${row.start_city}, ${row.start_country}</div>`;
                        }
                    },
                    {
                        targets: 4,
                        render: function(data, type, row) {
                            return `<div class="text-body">${row.end_city}, ${row.end_country}</div>`;
                        }
                    },
                    {
                        targets: -2,
                        render: function(data, type, row) {
                            const warningTypes = {
                                1: { title: "No Warnings", class: "bg-label-success" },
                                2: { title: "Temperature Not Optimal", class: "bg-label-warning" },
                                3: { title: "Ecu Not Responding", class: "bg-label-danger" },
                                4: { title: "Oil Leakage", class: "bg-label-info" },
                                5: { title: "Fuel Problems", class: "bg-label-primary" }
                            };
                            const warning = warningTypes[row.warnings];
                            return warning ? `<span class="badge rounded ${warning.class}">${warning.title}</span>` : data;
                        }
                    },
                    {
                        targets: -1,
                        render: function(data, type, row) {
                            const progress = row.progress;
                            return `
                                <div class="d-flex align-items-center">
                                    <div class="progress w-100" style="height: 8px;">
                                        <div class="progress-bar" role="progressbar" style="width:${progress}%;"
                                            aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="text-body ms-3">${progress}%</div>
                                </div>
                            `;
                        }
                    }
                ],
                order: [2, "asc"],
                dom: '<"table-responsive"t><"row d-flex align-items-center"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                displayLength: 5,
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function(row) {
                                return "Details of " + row.data().location;
                            }
                        }),
                        type: "column",
                        renderer: function(api, rowIdx, columns) {
                            const data = $.map(columns, function(col, i) {
                                return col.hidden ? '' : '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                                    '<td>' + col.title + ':' + '</td> <td>' + col.data + '</td></tr>';
                            }).join('');
                            return data ? $('<table class="table"/><tbody />').append(data) : false;
                        }
                    }
                },
                initComplete: function(settings, json) {
                    console.log("Data loaded:", json); // Log the JSON data after loading
                },
                error: function(xhr, error, thrown) {
                    console.error("Error loading data:", error); // Log any errors
                }
            });

            $(".dataTables_info").addClass("pt-0");
        }
    });
}


function BookingDetails() {
    $(function() {
        const routeVehicles = $(".dt-route-booking");
        if (routeVehicles.length) {
            routeVehicles.DataTable({
                ajax: {
                    url: "http://localhost:5000/api/vehicleInfo",
                    dataSrc: ""
                },
                columns: [
                    { data: null }, // Placeholder for the control column
                    { data: null }, // Placeholder for the checkboxes column
                    { data: "model" },
                    { data: "registration_number" },
                    { data: "vehicle_limit" },
                    { data: "vehicle_Remininglimit" },
                    { data: "color" },
                    { data: "contact" }
                ],
                columnDefs: [
                    {
                        className: "control",
                        orderable: false,
                        searchable: false,
                        responsivePriority: 2,
                        targets: 0,
                        render: function() { return ""; }
                    },
                    {
                        targets: 1,
                        orderable: false,
                        searchable: false,
                        checkboxes: true,
                        responsivePriority: 3,
                        render: function() { return '<input type="checkbox" class="dt-checkboxes form-check-input">'; }
                    }
                ],
                order: [[2, "asc"]], // Example order by 'Model' column
                dom: '<"table-responsive"t><"row d-flex align-items-center"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                displayLength: 5,
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function(row) {
                                return "Details of " + row.data().model;
                            }
                        }),
                        type: "column",
                        renderer: function(api, rowIdx, columns) {
                            const data = $.map(columns, function(col, i) {
                                return col.hidden ? '' : '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                                    '<td>' + col.title + ':' + '</td> <td>' + col.data + '</td></tr>';
                            }).join('');
                            return data ? $('<table class="table"/><tbody />').append(data) : false;
                        }
                    }
                },
                initComplete: function(settings, json) {
                    console.log("Data loaded:", json); // Log the JSON data after loading
                },
                error: function(xhr, error, thrown) {
                    console.error("Error loading data:", error); // Log any errors
                }
            });

            $(".dataTables_info").addClass("pt-0");
        }
    });
}
 
// Function to initialize DataTable
function initializeDataTable() {
    $(function() {
        const routeVehicles = $(".dt-route-vehicles");
        if (routeVehicles.length) {
            routeVehicles.DataTable({
                ajax: {
                    url: "http://localhost:5000/api/bookingList",
                    dataSrc: ""
                },
                columns: [
                    { data: null }, // Placeholder for the control column
                    { data: null }, // Placeholder for the checkboxes column
                    { data: "customer_name" },
                    { data: "from_city" },
                    { data: "to_city" },
                    { data: "pickup_date" },
                    { data: "tracking_id" }
                ],
                columnDefs: [
                    {
                        className: "control",
                        orderable: false,
                        searchable: false,
                        responsivePriority: 2,
                        targets: 0,
                        render: function() { return ""; }
                    },
                    {
                        targets: 1,
                        orderable: false,
                        searchable: false,
                        checkboxes: true,
                        responsivePriority: 3,
                        render: function() { return '<input type="checkbox" class="dt-checkboxes form-check-input">'; }
                    },
                    {
                        targets: 2,
                        responsivePriority: 1,
                        render: function(data, type, row) {
                            return `
                                <div class="d-flex justify-content-start align-items-center user-name">
                                   
                                    <div class="d-flex flex-column">
                                        <a class="text-body fw-medium" href="app-logistics-fleet.html">${row.customer_name}</a>
                                    </div>
                                </div>
                            `;
                        }
                    },
                    {
                        targets: 3,
                        render: function(data, type, row) {
                            return `<div class="text-body">${row.from_city}</div>`;
                        }
                    },
                    {
                        targets: 4,
                        render: function(data, type, row) {
                            return `<div class="text-body">${row.to_city}</div>`;
                        }
                    },
                    {
                        targets: 5,
                        render: function(data, type, row) {
                            return new Date(row.pickup_date).toLocaleDateString(); // Adjust date format as needed
                        }
                    },
                    {
                        targets: 6,
                        render: function(data, type, row) {
                            return row.tracking_id;
                        }
                    }
                ],
                order: [[2, "asc"]],
                dom: '<"table-responsive"t><"row d-flex align-items-center"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                displayLength: 5,
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function(row) {
                                return "Details of " + row.data().location;
                            }
                        }),
                        type: "column",
                        renderer: function(api, rowIdx, columns) {
                            const data = $.map(columns, function(col, i) {
                                return col.hidden ? '' : '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                                    '<td>' + col.title + ':' + '</td> <td>' + col.data + '</td></tr>';
                            }).join('');
                            return data ? $('<table class="table"/><tbody />').append(data) : false;
                        }
                    }
                },
                initComplete: function(settings, json) {
                    console.log("Data loaded:", json); // Log the JSON data after loading
                },
                error: function(xhr, error, thrown) {
                    console.error("Error loading data:", error); // Log any errors
                }
            });

            $(".dataTables_info").addClass("pt-0");
        }
    });
}


// Main function to initialize everything
function initializeApp() {
    fetchAndUpdateCounters();
    initializeCharts();
    initializeDataTable();
    BookingDetails();
    vehiclesDetails();

}

// Run initialization when the document is ready
$(document).ready(function() {
    initializeApp();
});
