import React from "react";
import { MDBTableBody, MDBIcon, MDBTooltip, MDBBtn } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

export default function TableBody({
  datas,
  page,
  name,
  contents,
  actions,
  handlers,
  width,
}) {
  const { maxPage } = useSelector(({ auth }) => auth);

  const handlePagination = (array, page) =>
    array.slice((page - 1) * maxPage, maxPage + (page - 1) * maxPage);

  return (
    <MDBTableBody>
      {datas.length > 0 &&
        handlePagination(datas, page).map((data, index) => (
          <tr key={`${name}-${index}`}>
            {contents.map((content, cIndex) => {
              if (typeof content === "object") {
                const { _keys, _format, _styles } = content;

                const stringTxt = () => (
                  <p className="mb-0">
                    {_format ? _format(data[_keys]) : data[_keys]}
                  </p>
                );

                const arrayTxt = () => (
                  <>
                    <p className="fw-bold mb-1">
                      {_format[0] ? _format[0](data[_keys[0]]) : data[_keys[0]]}
                    </p>
                    <p className="text-muted mb-0">
                      {_format[1] ? _format[1](data[_keys[1]]) : data[_keys[1]]}
                    </p>
                  </>
                );

                return (
                  <td key={`${_keys}-${cIndex}`} className={`${_styles}`}>
                    {typeof _keys === "string" ? stringTxt() : arrayTxt()}
                  </td>
                );
              } else {
                return (
                  <td key={`${content}-${cIndex}`}>
                    <p className="mb-0">{data[content]}</p>
                  </td>
                );
              }
            })}
            {actions.length > 0 && (
              <td className="text-center">
                {actions?.map((action, index) => {
                  const {
                    _title,
                    _placement,
                    _color,
                    _function,
                    _name,
                    _icon,
                    _condition,
                  } = action;

                  if (_condition) {
                    if (_condition(data)) {
                      return (
                        <MDBTooltip
                          key={`${name}-action-${index}`}
                          tag="span"
                          wrapperClass="d-inline-block"
                          title={_title}
                          placement={_placement}
                        >
                          <MDBBtn
                            onClick={() => handlers[_function](data)}
                            outline
                            floating
                            color={_color}
                            size={width < 768 && "sm"}
                            key={`${name}-${_name}-${index}`}
                          >
                            <MDBIcon icon={_icon} />
                          </MDBBtn>
                        </MDBTooltip>
                      );
                    }
                  } else {
                    return (
                      <MDBTooltip
                        key={`${name}-action-${index}`}
                        tag="span"
                        wrapperClass="d-inline-block"
                        title={_title}
                        placement={_placement}
                      >
                        <MDBBtn
                          onClick={() => handlers[_function](data)}
                          outline
                          floating
                          color={_color}
                          size={width < 768 && "sm"}
                          key={`${name}-${_name}-${index}`}
                        >
                          <MDBIcon icon={_icon} />
                        </MDBBtn>
                      </MDBTooltip>
                    );
                  }
                })}
              </td>
            )}
          </tr>
        ))}
    </MDBTableBody>
  );
}
