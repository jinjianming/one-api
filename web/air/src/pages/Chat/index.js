import React, { useEffect, useState } from 'react';
import { API, showError } from '../../helpers';
import { useSearchParams } from "react-router-dom";

const Chat = () => {
  const [key, setKey] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState({});
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');

  const getKey = async () => {
    try {
      const res = await API.get(`/api/token/`);
      const { success, message, data } = res.data;
      if (success) {
        const defaultToken = data.find(token => token.name === "默认令牌");
        if (defaultToken) {
          setKey(defaultToken.key);
        } else {
          showError('默认令牌 not found.');
        }
      } else {
        showError(message);
      }
    } catch (error) {
      showError('Failed to fetch the key.');
    }
  };

  useEffect(() => {
    getKey();
  }, []);

  useEffect(() => {
    if (key) {
      onOpenLink("default", key);
    }
  }, [key]);

  const onOpenLink = async (type, key) => {
    let status = localStorage.getItem('status');
    let serverAddress = '';
    if (status) {
      status = JSON.parse(status);
      serverAddress = status.server_address;
    }
    if (!serverAddress) {
      serverAddress = window.location.origin;
    }
    const encodedServerAddress = encodeURIComponent(serverAddress);
    const chatLink = localStorage.getItem('chat_link');
    let defaultUrl;

    if (chatLink) {
      defaultUrl = `${chatLink}/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
    } else {
      defaultUrl = `https://app.nextchat.dev/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
    }

    let url;
    switch (type) {
      default:
        url = defaultUrl;
    }

    window.open(url, '_blank');
  };

  return (
      <>
        {/* Add any additional UI or elements here if needed */}
      </>
  );
};

export default Chat;
