import { useState, useCallback } from 'react';
import { userAPI } from '../api';

export const useUser = () => {
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const loadProfile = useCallback(async () => {
    const { data } = await userAPI.getMe();
    setProfile(data);
  }, []);

  const updateProfile = async (payload) => {
    const { data } = await userAPI.updateMe(payload);
    setProfile(data);
  };

  const loadAddresses = useCallback(async () => {
    const { data } = await userAPI.getAddresses();
    setAddresses(data);
  }, []);

  const addAddress = async (payload) => {
    await userAPI.addAddress(payload);
    await loadAddresses();
  };

  const removeAddress = async (id) => {
    await userAPI.removeAddress(id);
    await loadAddresses();
  };

  const loadFavorites = useCallback(async (params) => {
    const { data } = await userAPI.getFavorites(params);
    setFavorites(data.items || []);
  }, []);

  const toggleFavorite = async (productId, isFavorite) => {
    if (isFavorite) {
      await userAPI.removeFavorite(productId);
    } else {
      await userAPI.addFavorite(productId);
    }
  };

  return {
    profile, loadProfile, updateProfile,
    addresses, loadAddresses, addAddress, removeAddress,
    favorites, loadFavorites, toggleFavorite,
  };
};