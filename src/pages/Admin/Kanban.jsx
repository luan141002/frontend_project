// import React from 'react';
// import {
//     KanbanComponent,
//     ColumnsDirective,
//     ColumnDirective,
// } from '@syncfusion/ej2-react-kanban';

// import { kanbanData, kanbanGrid } from './data.js';

// const Kanban = () => {
//     return (
//         <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//             <div className=" mb-10">
//                 <p className="text-lg text-gray-400">App</p>
//                 <p className="text-3xl font-extrabold tracking-tight text-slate-900">
//                     Title
//                 </p>
//             </div>
//             <KanbanComponent
//                 id="kanban"
//                 keyField="Status"
//                 dataSource={kanbanData}
//                 cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
//             >
//                 <ColumnsDirective>
//                     {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//                     {kanbanGrid.map((item, index) => (
//                         <ColumnDirective key={index} {...item} />
//                     ))}
//                 </ColumnsDirective>
//             </KanbanComponent>
//         </div>
//     );
// };

// export default Kanban;
