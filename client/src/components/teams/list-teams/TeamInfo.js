import classNames from 'classnames';
import Avatar from 'components/common/Avatar';
import Flex from 'components/common/Flex';
import React from 'react';
import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SoftBadge from 'components/common/SoftBadge';
import PropTypes from 'prop-types';
import BasicECharts from 'components/common/BasicEChart';

import * as echarts from 'echarts/core';
import { getColor } from 'helpers/utils';
import FalconLink from 'components/common/FalconLink';
import SimpleBarReact from 'simplebar-react';

const TeamRow = ({
  name,
  projectManagerId,
  _id
}) => {
  return (
    <tr className={classNames( 'border-bottom border-200' )}>
      <td>

        <Flex alignItems="center" className="position-relative">
          <Avatar
            size="2xl"
            width="60"
            alt={name}
          />
          <div className="flex-1 ms-3">
            <h6 className="mb-0 fw-semi-bold">
              <Link className="text-dark stretched-link" to={`${_id}/details`}>
                {name}
              </Link>
            </h6>
          </div>
        </Flex>
      </td>
      <td className="align-middle text-center fw-semi-bold">
            
                {projectManagerId}
      </td>
    </tr>
  );
};

const TeamInfo = ({ data }) => {
  return (
    <Card className="h-100">
      <Card.Body className="p-0">
        <SimpleBarReact>
          <Table
            borderless
            className="mb-0 fs--1 border-200 rounded-3 table-dashboard table-member-info"
          >
            <thead className="bg-light">
              <tr className="text-900">
                <th>Team NAme</th>
                <th className="text-center">Project Manager ID</th>
                <th className="text-center">Today</th>
                <th className="text-end">This Week</th>
              </tr>
            </thead>
            <tbody>
              {data.result?.map((info, index) => (
                <TeamRow
                  {...info}
                  isLast={index === data.length - 1}
                  key={info.id}
                />
              ))}
            </tbody>
          </Table>
        </SimpleBarReact>
      </Card.Body>
    </Card>
  );
};

/*UserRow.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  img: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  attendance: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }),
  today: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }),
  thisWeek: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }),
  data: PropTypes.array.isRequired
};

UserInfo.propTypes = {
  data: PropTypes.array.isRequired
};*/

export default TeamInfo;
