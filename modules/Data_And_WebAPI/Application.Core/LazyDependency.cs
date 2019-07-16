﻿using System;
using CommonServiceLocator;

namespace Application.Core
{
	public class LazyDependency<TInterface> : Lazy<TInterface>
	{
		public LazyDependency()
			: base(GetValueInitializer(), true)
		{
		}

		private static Func<TInterface> GetValueInitializer()
		{
			return () => ServiceLocator.Current.GetInstance<TInterface>();
		}
	}
}
