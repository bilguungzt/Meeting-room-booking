import { render } from "react-dom";
import "./index.css";
import * as React from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
  Inject,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import { extend, isNullOrUndefined } from "@syncfusion/ej2-base";
import { SampleBase } from "./sample-base";
import dataSource from "./datasource.json";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import CRUDrooms from "./components/CRUDrooms";
import CRUDmeetings from "./components/CRUDmeetings";

export class TimelineResource extends SampleBase {
  data = new DataManager({
    url: "http://localhost:5000/students",
    crudUrl: "http://localhost:5000/students",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });
  remoteroomsData = new DataManager({
    url: "http://localhost:5000/roomss",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  constructor() {
    super(...arguments);

    this.ownerData = this.remoteroomsData;
  }

  getRoomName(value) {
    return value.resourceData[value.resource.textField];
  }
  getRoomType(value) {
    return value.resourceData.type;
  }
  getRoomCapacity(value) {
    return value.resourceData.capacity;
  }
  isReadOnly(endDate) {
    //READ ONLY DATE
    return endDate > new Date(2021, 6, 31, 0, 0);
  }
  resourceHeaderTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="room-name">{this.getRoomName(props)}</div>
        <div className="room-type">{this.getRoomType(props)}</div>
        <div className="room-capacity">{this.getRoomCapacity(props)}</div>
      </div>
    );
  }
  onActionBegin(args) {
    if (
      args.requestType === "eventCreate" ||
      args.requestType === "eventChange"
    ) {
      let data = args.data instanceof Array ? args.data[0] : args.data;
      args.cancel = !this.scheduleObj.isSlotAvailable(data);
    }
  }
  onEventRendered(args) {
    let data = args.data;
    if (this.isReadOnly(data.EndTime)) {
      args.element.setAttribute("aria-readonly", "true");
      args.element.classList.add("e-read-only");
    }
  }
  onRenderCell(args) {
    if (args.element.classList.contains("e-work-cells")) {
      //READ ONLY CELLS DATE
      if (args.date > new Date(2021, 6, 31, 0, 0)) {
        args.element.setAttribute("aria-readonly", "true");
        args.element.classList.add("e-read-only-cells");
      }
    }
    if (
      args.elementType === "emptyCells" &&
      args.element.classList.contains("e-resource-left-td")
    ) {
      let target = args.element.querySelector(".e-resource-text");
      target.innerHTML =
        '<div class="name">Rooms</div><div class="type">Type</div><div class="capacity">Capacity</div>';
    }
  }
  onPopupOpen(args) {
    let data = args.data;
    if (
      args.type === "QuickInfo" ||
      args.type === "Editor" ||
      args.type === "RecurrenceAlert" ||
      args.type === "DeleteAlert"
    ) {
      let target =
        args.type === "RecurrenceAlert" || args.type === "DeleteAlert"
          ? args.element[0]
          : args.target;
      if (
        !isNullOrUndefined(target) &&
        target.classList.contains("e-work-cells")
      ) {
        if (
          target.classList.contains("e-read-only-cells") ||
          !this.scheduleObj.isSlotAvailable(data)
        ) {
          args.cancel = true;
        }
      } else if (
        !isNullOrUndefined(target) &&
        target.classList.contains("e-appointment") &&
        this.isReadOnly(data.EndTime)
      ) {
        args.cancel = true;
      }
    }
  }
  render() {
    return (
      <>
        <div className="schedule-control-section">
          <div className="col-lg-12 control-section">
            <div className="control-wrapper">
              <ScheduleComponent
                cssClass="timeline-resource"
                ref={(schedule) => (this.scheduleObj = schedule)}
                width="100%"
                height="auto"
                // selectedDate={new Date(2021, 7, 2)}
                workHours={{ start: "08:00", end: "21:00" }}
                timeScale={{ interval: 60, slotCount: 1 }}
                resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
                eventSettings={{
                  dataSource: this.data,
                  fields: {
                    id: "Id",
                    subject: { title: "Summary", name: "Subject" },
                    location: { title: "Location", name: "Location" },
                    description: { title: "Comments", name: "Description" },
                    startTime: { title: "From", name: "StartTime" },
                    endTime: { title: "To", name: "EndTime" },
                  },
                }}
                eventRendered={this.onEventRendered.bind(this)}
                popupOpen={this.onPopupOpen.bind(this)}
                actionBegin={this.onActionBegin.bind(this)}
                renderCell={this.onRenderCell.bind(this)}
                group={{ enableCompactView: false, resources: ["MeetingRoom"] }}
              >
                <ResourcesDirective>
                  <ResourceDirective
                    field="RoomId"
                    title="Room Type"
                    name="MeetingRoom"
                    allowMultiple={true}
                    dataSource={this.ownerData}
                    textField="text"
                    idField="id"
                    colorField="color"
                  ></ResourceDirective>
                </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option="TimelineDay" />
                  <ViewDirective option="TimelineWeek" />
                </ViewsDirective>
                <Inject services={[TimelineViews]} />
              </ScheduleComponent>
            </div>
          </div>
        </div>{" "}
        <div
          style={{
            width: "100%",
            display: "grid",
            justifyContent: "center",
            marginBottom: "20px",
            paddingBottom: "20px",
            gridTemplateColumns: "1fr",
          }}
        >
          <CRUDrooms />
          <CRUDmeetings />
        </div>
      </>
    );
  }
}

render(<TimelineResource />, document.getElementById("sample"));
