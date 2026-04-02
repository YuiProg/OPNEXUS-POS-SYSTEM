import React from "react";
import "./Radio.css";

class Radio extends React.Component {
    render() {
        const { filters, onFilterChange } = this.props;

        return (
            <div className="settings-demo">
                {/* SHIFT TOGGLE */}
                <div className="setting-row">
                    <label className="setting-control">
                        <input
                            type="checkbox"
                            checked={filters.shift === "night"}
                            onChange={() => onFilterChange("shift", "night")}
                        />
                        <span className="switch switch--shift"></span>
                    </label>

                    <div
                        className="setting-text"
                        onClick={() => onFilterChange("shift", filters.shift === "night" ? "day" : "night")}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="setting-title">Shift</div>
                        <div className="setting-subtitle">
                            {filters.shift === "night" ? "Night" : "Day"}
                        </div>
                    </div>
                </div>

                {/* AVAILABILITY TOGGLE */}
                <div className="setting-row">
                    <label className="setting-control">
                        <input
                            type="checkbox"
                            checked={filters.availability === "online"}
                            onChange={() => onFilterChange("availability", "online")}
                        />
                        <span className="switch switch--availability"></span>
                    </label>

                    <div
                        className="setting-text"
                        onClick={() =>
                            onFilterChange(
                                "availability",
                                filters.availability === "online" ? "offline" : "online"
                            )
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <div className="setting-title">Availability</div>
                        <div className="setting-subtitle">
                            {filters.availability === "online" ? "Online" : "Offline"}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Radio;